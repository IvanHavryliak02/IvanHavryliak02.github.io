
const burgerButton = document.querySelector('.promo__burger');
const crossButton = document.querySelector('.menu__cross');
const menu = document.querySelector('.menu');

crossButton.addEventListener('click', () => {
    menu.style.left = '-345px'
})

burgerButton.addEventListener('click', () => {
    menu.style.left = '0';
})