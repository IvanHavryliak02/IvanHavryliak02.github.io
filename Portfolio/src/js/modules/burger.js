

export default function(sectionSelector, menuSelector){
    const menuTrigger = document.querySelector(`${sectionSelector}__burger`);
    const menu = document.querySelector(menuSelector)
    const menuCloser = document.querySelector(`${menuSelector}__cross`);
    const initPosition = parseInt(getComputedStyle(menu).left);
    const menuWidth = parseInt(getComputedStyle(menu).width);
    
    menuTrigger.addEventListener('click', () => {
        menu.style.left = `${initPosition + menuWidth}px`;
        menuTrigger.style.display = 'none'; 
    })

    menuCloser.addEventListener('click', () => {
        menu.style.left = `-${menu.offsetWidth}px`;
        menuTrigger.style.display = '';  
    })
}