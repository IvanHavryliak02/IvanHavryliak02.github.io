
import translationDB from './translation-db.js'
import clickDelegate from './click-delegation.js'

export default function(elementSelector){
    //execution code
    const settings = {
        defaultLan: 'en'.toUpperCase()
    }
    const menu = document.querySelector(elementSelector);
    const activeClass = `${elementSelector}__active-sel`.slice(1);
    let activeButton;

    defaultSetting();
    clickDelegate(menu, `${elementSelector}__select`, changeLanguage);
    translate();
    // functions
    function defaultSetting(){
        if(window.location.hash !== `#${settings.defaultLan}`){
            window.location.hash = `#${settings.defaultLan}`
        }
        activeButton = menu.querySelector(`#${settings.defaultLan}`.toLowerCase())
        activeButton.classList.add(activeClass);
    }

    function changeLanguage(clickedItem){
        activeButton.classList.remove(activeClass);
        if(!clickedItem.classList.contains(activeClass)){
            clickedItem.classList.add(activeClass);
            const itemContent = clickedItem.innerHTML;
            window.location.hash = `#${itemContent}`;
            activeButton = clickedItem;
            translate();
        }
    }

    function translate(){
        const transTargets = document.querySelectorAll("[data-lng]");
        const currentLanguage = window.location.hash.slice(1).toUpperCase();
        let key;
        transTargets.forEach(target => {
            key = target.dataset.lng;
            target.innerHTML = translationDB[key][currentLanguage];
        })
    }
}
