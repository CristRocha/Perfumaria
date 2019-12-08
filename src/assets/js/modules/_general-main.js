export const General ={
  init(){
    General.menuMobile();
  },
  components: {
    mainShelf: document.querySelector('.js--shelf'),
    mobileMenu: document.querySelector('.mobile-menu'),
    navMenu: document.querySelector('.header__nav'),
    listMenu: document.querySelector('.header__menu'),
  },
  //Desk
    menuMobile() {
      General.components.mobileMenu.addEventListener('click', function () {
        this.classList.toggle("has--change");
        General.components.navMenu.classList.toggle("has--change");
        General.components.listMenu.classList.toggle("has--change");
      })
    }
  }