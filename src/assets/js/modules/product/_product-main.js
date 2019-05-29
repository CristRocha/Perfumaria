
const Methods = {
    components: {
        buyButton: document.querySelector('.js--buy-button'),
        productImg: document.querySelector('js--product-img'),
        productName: document.querySelector('.js--product-name'),
        productValue: document.querySelector('.js--product-value'),
        shelf: document.querySelector('.js--shelf'),
        cart:document.querySelector('.js--cart'),
      },
    init() {
      Methods._addToCart();
    //   Methods._removeQty();
    },
    
    /**
     * @access private
     */
    _addToCart() {
        components.buyButton.addEventListener('click', (ev) => {
            ev.preventDefault();

        });
    },
    /**
     * @access private
     */
    // _removeQty() {
    //     components.removeButton.addEventListener('click', (ev) => {
    //         ev.preventDefault();
    //         if (+component.cart.value > 1) {
    //             component.inputQty.value = --component.inputQty.value;
    //         }
    //     });
    // }
}

export default {
    init: Methods.init,
}