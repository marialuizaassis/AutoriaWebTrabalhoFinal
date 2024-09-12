class Card extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {

    const div = document.createElement("div");
    div.className = "col-md-4 mb-4"; 

    div.innerHTML = `
      <div class="card" style="width: 18rem; border:none; display: flex">
        <img id="img" src="${this.getAttribute("img")}" class="card-img-top" alt="${this.getAttribute("alt")}">
        <div class="card-body">
          <h4 id="titulo" class="card-title">${this.getAttribute("titulo")}</h4>
          ${this.getAttribute("preco") ? `<h5 id="preco" class="card-text">Por: R$ ${this.getAttribute("preco")}</h5>` : ""}
          <p id="descricao" class="card-text" style="color: black;">${this.getAttribute("descricao")}</p>
          <a href="produto.html?id=${this.getAttribute("id")}" class="btn btn-primary">Ir ao Produto</a>
        </div>
      </div>
    `;

    this.appendChild(div);
  }
}


customElements.define("card-item", Card);


async function loadProducts() {
  const response = await fetch("http://localhost:3000/produtos");
  const products = await response.json();
  const container = document.getElementById("products-container");

  products.forEach((produtos) => {
      const productCard = document.createElement("card-item");
      productCard.setAttribute("id", produtos.id);
      productCard.setAttribute("titulo", produtos.titulo);
      productCard.setAttribute("preco", produtos.preco);
      productCard.setAttribute("img", produtos.img);
      productCard.setAttribute("descricao", produtos.descricao);
      

      productCard.addEventListener("click", () => {
      // Redirecionar para a página de detalhes do produto
      window.location.href = `produtos.html?id=${products.id}`;
      });

      container.appendChild(productCard);
  });
}

loadProducts()



const params = new URLSearchParams(window.location.search); 
const id = params.get('id'); 

async function loadProduct() {
    const response = await fetch(`http://localhost:3000/produtos/${id}`);
    console.log(response);
    const product = await response.json();
    const container = document.getElementById("produto-container");

    console.log(product);

    const produtos = Array.isArray(product) ? product[0] : product;
    console.log(produtos);

    container.innerHTML = `
    <div class="col-md-4">
        <div class="card">
            <img id="img" class="card-img-top" src="${product.img}" alt="${product.alt}">
            <div class="card-body">
                <h5 id="titulo" class="card-title">${product.titulo}</h5>
                <p id="descricao" class="card-text">${product.descricao}</p>
                <p id="preco" class="card-text">Por: R$ ${product.preco.toFixed(2)}</p>
                <button id="add-to-cart" class="btn btn-primary" style="background-color: pink; margin: 20px;">Adicionar ao Carrinho</button>
            </div>
        </div>
    </div>
    `
    document.getElementById('titulo').innerHTML = product.titulo;
    document.getElementById('preco').innerHTML = `Valor: R$ ${product.preco}`;
    document.getElementById('descricao').innerHTML = product.descricao;
    document.getElementById('img').src = product.img;
    document.getElementById('img').alt = product.alt;

    document.getElementById('add-to-cart').addEventListener('click', () => {
        let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        const produtoExistente = carrinho.find(item => item.id == id);

        if (!produtoExistente) {
            carrinho.push({ id: id, quantidade: 1});
            localStorage.setItem('carrinho', JSON.stringify(carrinho));
        }
        
        document.location.href = 'carrinho.html?id=' + id;
    });

    return product;
}

  
loadProduct()


let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

function renderCarrinho() {
  const produtosContainer = document.getElementById('produtos-body');
  produtosContainer.innerHTML = ""; // Limpar o container existente

  const promises = carrinho.map(item => getData(item.id, item.quantidade));

  Promise.all(promises).then(() => {
      console.log('Todos os produtos foram carregados.');
  });
}

function getData(id, quantidade) {
  return fetch(`http://localhost:3000/produtos/${id}`)
      .then(response => {
          if (!response.ok) {
              throw new Error('Produto não encontrado');
          }
          return response.json();
      })
      .then(data => renderizar(data, quantidade))
      .catch(error => console.error('Erro ao carregar produto:', error));
}

function renderizar(product, quantidade) {
    // Cria a linha do produto
    const produtoRow = document.createElement('tr');

    produtoRow.innerHTML = `
        <td>
            <figure class="media">
                <div class="img-wrap">
                    <img src="${product.img}" style="height: 125px; width: 100px; margin: 10px;" class="img-thumbnail img-sm">
                </div>
                <figcaption class="media-body">
                    <h6 class="title text-truncate">${product.titulo}</h6>
                </figcaption>
            </figure>
        </td>
        <td>
            <input type="number" value="${quantidade}" min="1" max="10" class="form-control" onchange="atualizarQuantidade(${product.id}, this.value)">
        </td>
        <td>
            <div class="price-wrap">
                <var class="price">R$ ${product.preco.toFixed(2)}</var>
            </div>
        </td>
        <td>
            <div class="price-wrap">
                <var class="price">R$ ${(product.preco * quantidade).toFixed(2)}</var>
            </div>
        </td>
        <td class="text-right">
            <button class="btn btn-outline-danger" onclick="remover(${product.id})">× Remover</button>
        </td>
    `;

    // Adiciona a linha ao corpo da tabela
    document.getElementById('produtos-body').appendChild(produtoRow);
}

function atualizarQuantidade(id, novaQuantidade) {
    carrinho = carrinho.map(item => {
        if (item.id == id) {
            item.quantidade = Number(novaQuantidade);
        }
        return item;
    });
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    renderCarrinho(); // Re-renderizar o carrinho para atualizar os preços
}

function remover(id) {
    carrinho = carrinho.filter(item => item.id != id);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    renderCarrinho(); // Re-renderizar o carrinho após a remoção
}

// Inicializar a renderização do carrinho
document.addEventListener('DOMContentLoaded', function() {
  renderCarrinho();
});
