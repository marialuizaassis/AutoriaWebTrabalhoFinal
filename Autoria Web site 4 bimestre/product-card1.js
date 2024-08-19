document.addEventListener('DOMContentLoaded', function () {
  const containerElement = document.getElementById("product-container");

  function getJson(url) {
      return fetch(url)
          .then(response => {
              if (!response.ok) {
                  throw new Error('Erro na resposta da rede: ' + response.statusText);
              }
              return response.json();
          })
          .catch(error => {
              console.error('Erro ao carregar o JSON:', error);
              return [];
          });
  }

  function renderizarProdutos(json) {
      let html = "";

      for (let produto of json) {
          let temp = `
              <div class="col-md-4">
                  <div class="card">
                      <img src="${produto.img}" class="card-img-top" alt="${produto.alt}">
                      <div class="card-body">
                          <h4 class="card-title">${produto.titulo}</h4>
                          ${produto.precoantigo ? `<p><del>De: R$ ${produto.precoantigo}</del></p>` : ""}
                          ${produto.novopreço ? `<h5 class="card-text">Por: R$ ${produto.novopreço}</h5>` : ""}
                          <p class="card-text">${produto.descrição}</p>
                          <a href="${produto.link}" class="btn btn-primary">Ir ao Produto</a>
                      </div>
                  </div>
              </div>
          `;

          html += temp;
      }

      containerElement.innerHTML = html;
  }

  getJson('../db.json')
      .then(json => renderizarProdutos(json))
      .catch(error => console.error('Erro ao renderizar os produtos:', error));
});
