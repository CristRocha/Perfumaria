
const Methods = {
  init() {
    Methods.getProducts();
    Methods.menuMobile();
  },
  //Cache do Dom  
  components: {
    mainShelf: document.querySelector('.js--shelf'),
    cart: document.querySelector('.js--cart'),
    mobileMenu: document.querySelector('.mobile-menu'),
    navMenu: document.querySelector('.header__nav'),
    listMenu: document.querySelector('.header__menu'),
  },
  //Cache dos produtos
  products: [],

  //Atributo
  cart: {
    total: 0,
    qty: 0
  },

  //Requisição única da API
  getProducts() {
    fetch('https://raw.githubusercontent.com/CristRocha/Perfumaria/master/src/assets/js/products.json')
      .then((res) => res.text())
      .then((data) => {
        JSON.parse(data).forEach(product => {
          Methods.products.push({
            name: product.name,
            price: product.Value,
            img: product.images[0].imageUrl,
          })
        });
        Object.freeze(Methods.products);
        Methods.renderShelf();
      })
  },
  //Montar Prateleiras
  renderShelf() {
    Methods.products.forEach(product => {
      let shelfProduct = document.createElement('div');
      let button = document.createElement('button');
      let img = document.createElement('img');
      let name = document.createElement('div');
      let price = document.createElement('div');

      shelfProduct.classList.add('shelf__product');
      img.classList.add('shelf__product-img');
      name.classList.add('shelf__product-name');
      price.classList.add('shelf__product-value');
      button.classList.add('shelf__product-buy');

      img.setAttribute('src', product.img)
      name.textContent = product.name;
      price.textContent = "R\u0024 " + product.price.toFixed(2).replace(".", ",");
      button.addEventListener('click', Methods.addToCart)

      shelfProduct.appendChild(button)
      shelfProduct.appendChild(img)
      shelfProduct.appendChild(name)
      shelfProduct.appendChild(price)
      this.components.mainShelf.appendChild(shelfProduct);
    });
  },

  //Valida e Adiciona os valores ao Carrinho
  addToCart(ev) {
    ev.preventDefault();

    let val = parseFloat(ev.target.parentNode.lastChild.textContent.replace("R\u0024", "").replace(",", "."));
    let name = ev.target.parentNode.querySelector('.shelf__product-name').textContent;

    //Verifica se os valores estão corretos
    let chosen = Methods.products.filter(item => {
      return name == item.name && val == item.price
    })

    //Se o item existe
    if (chosen.length) {
      Methods.cart.total += chosen[0].price;
      Methods.components.cart.innerText = "R$ " + Methods.cart.total.toFixed(2).replace(".", ",");
    } else {
      alert("Produto Indisponível")
    }
  },

  menuMobile() {
    Methods.components.mobileMenu.addEventListener('click', function () {
      this.classList.toggle("change");
      Methods.components.navMenu.classList.toggle("change");
      Methods.components.listMenu.classList.toggle("change");
    })
  }
}
export default {
  init: Methods.init
}