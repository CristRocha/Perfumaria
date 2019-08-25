import axios from 'axios';
import { intersect } from '../api/intersection-Observer';
const Category = {
  init() {
    Category.getProducts();
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
    axios.get('https://raw.githubusercontent.com/CristRocha/Perfumaria/master/src/assets/js/api/products.json')
      .then(({data}) => {
        data.forEach(product => {
          Category.products.push({
            name: product.name,
            price: product.Value,
            img: product.images[0].imageUrl,
          })
        });
        Object.freeze(Category.products);
        Category.renderShelf();
      })
  },
  //Montar Prateleiras
  renderShelf() {

    Category.products.forEach(product => {
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

      img.setAttribute('data-lazy', product.img)
      name.textContent = product.name;
      price.textContent = "R\u0024 " + product.price.toFixed(2).replace(".", ",");
      button.addEventListener('click', Category.addToCart)

      shelfProduct.appendChild(button)
      shelfProduct.appendChild(img)
      shelfProduct.appendChild(name)
      shelfProduct.appendChild(price)
      this.components.mainShelf.appendChild(shelfProduct);
    });
    intersect(document.querySelectorAll('.shelf__product-img'));
  },

  //Valida e Adiciona os valores ao Carrinho
  addToCart(ev) {
    ev.preventDefault();

    let val = parseFloat(ev.target.parentNode.lastChild.textContent.replace("R\u0024", "").replace(",", "."));
    let name = ev.target.parentNode.querySelector('.shelf__product-name').textContent;

    //Verifica se os valores estão corretos
    let chosen = Category.products.filter(item => {
      return name == item.name && val == item.price
    })

    //Se o item existe
    if (chosen.length) {
      Category.cart.total += chosen[0].price;
      Category.components.cart.innerText = "R$ " + Category.cart.total.toFixed(2).replace(".", ",");
    } else {
      alert("Produto Indisponível")
    }
  },
}
export default {
  init: Category.init
}