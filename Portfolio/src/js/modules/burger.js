

export default function(sectionSelector, menuSelector){
    const menuTrigger = document.querySelector(`${sectionSelector}__burger`);
    const menu = document.querySelector(menuSelector)
    const menuCloser = document.querySelector(`${menuSelector}__cross`);
    const initPosition = parseInt(getComputedStyle(menu).left);
    
    menuTrigger.addEventListener('click', () => {
        menu.style.left = `${initPosition - initPosition}px`;
        menuTrigger.style.display = 'none'; 
    })

    menuCloser.addEventListener('click', () => {
        menu.style.left = `${initPosition}px`;
        menuTrigger.style.display = '';  
    })
}