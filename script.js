class Navbar extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      const nav = document.createElement("nav");
      nav.innerHTML = `<nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" href="index.html">Lú Perfumaria</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link" href="produtos.html">Produtos</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="cadastro.html">Cadastro</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="carrinho.html">              
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart2" viewBox="0 0 16 16">
                  <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0"/>
                  </svg>
                </a>
              </li>
            </ul>
            <form class="d-flex" role="search">
              <input class="form-control me-2" type="search" placeholder="Pesquise aqui" aria-label="Search">
              <button class="btn btn-outline-success" type="submit">Pesquisar</button>
            </form>
          </div>
        </div>
      </nav>`;
      this.appendChild(nav);
    }

  }

customElements.define("nav-bar", Navbar);