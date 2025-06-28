
import delegateClick from './click-delegation.js';

export default function(sectionSelector){
    const cards = document.querySelectorAll(`${sectionSelector}__item`);
    const cardsContainer = document.querySelector(`${sectionSelector}_grid-works`);

    setDefultAtt();

    delegateClick(cardsContainer, (e) => {
        const clickedItem = e.target.closest(`${sectionSelector}__item`);
        if(clickedItem){
            operateCard(clickedItem);
        }
    })

    function setDefultAtt(){
        cards.forEach(item => { 
            item.setAttribute('data-counter', '0');
        })
    }

    function operateCard(item){
        let counter = +item.getAttribute('data-counter')
        if(counter >= 1){
            item.setAttribute('data-counter', '0');
            item.querySelector(`${sectionSelector}__card`).style.bottom = '-100%';
            window.open(item.href, '_blank')
        }else{
            counter++;
            item.setAttribute('data-counter', counter);
            item.querySelector(`${sectionSelector}__card`).style.bottom = '0';
        }
    }
}