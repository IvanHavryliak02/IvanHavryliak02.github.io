
import delegateClick from './click-delegation.js';

export default function(sectionSelector){
    const cards = document.querySelectorAll(`${sectionSelector}__item`);
    const cardsContainer = document.querySelector(`${sectionSelector}_grid-works`);

    setDefaultAtt();
    delegateClick(cardsContainer, `${sectionSelector}__item`, operateCard, true);

    function setDefaultAtt(){
        cards.forEach(item => { 
            item.setAttribute('data-counter', '0');
        })
    }

    function operateCard(item){
        let counter = +item.getAttribute('data-counter')
        if(counter >= 1){
            item.setAttribute('data-counter', '0');
            item.querySelector(`${sectionSelector}__card`).style.bottom = '-100%';
            window.open(item.href, '_blank');
            item.querySelector(`${sectionSelector}__card`).style.border = ''
            item.querySelector(`img`).style.filter = '' 
        }else{
            counter++;
            item.setAttribute('data-counter', counter);
            item.querySelector(`${sectionSelector}__card`).style.bottom = '0';
            item.querySelector(`${sectionSelector}__card`).style.border = '0.5px solid #000';
            item.querySelector(`img`).style.filter = 'blur(4px)'; 
        }
    }
}