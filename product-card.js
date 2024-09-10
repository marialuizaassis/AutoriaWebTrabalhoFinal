class ProductCard extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      const img = this.getAttribute("img") || "";
      const alt = this.getAttribute("alt") || "";
      const titulo = this.getAttribute("titulo") || "";
      const precoAntigo = this.getAttribute("preçoantigo") || "";
      const novoPreco = this.getAttribute("novopreço") || "";
      const descricao = this.getAttribute("descrição") || "";
      const link = this.getAttribute("link") || "#";
  
      const div = document.createElement("div");
      div.className = "col-md-4 mb-4";
      div.innerHTML = `
        <div class="card">
          <img src="${img}" class="card-img-top" alt="${alt}">
          <div class="card-body">
            <h4 class="card-title">${titulo}</h4>
            ${precoAntigo ? `<p><del>De: R$ ${precoAntigo}</del></p>` : ""}
            ${novoPreco ? `<h5 class="card-text">Por: R$ ${novoPreco}</h5>` : ""}
            <p class="card-text" style="color: black;">${descricao}</p>
            <a href="${link}" class="btn btn-primary">Ir ao Produto</a>
          </div>
        </div>
      `;
      this.appendChild(div);
    }
  }
  
  customElements.define("product-card", ProductCard);