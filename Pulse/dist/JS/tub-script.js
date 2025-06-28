const cardContents = document.querySelectorAll('.presentation-card__wrap'); //wrap variable
const cardLists = document.querySelectorAll('.presentation-card__list'); //list variable
const contentChangers = document.querySelectorAll('.presentation-card__details'); //button for activation script <a></a>
const tabs = document.querySelectorAll('.presentation__tab');
const fitnessTab = document.getElementById('fitness');
const runningTab = document.getElementById('running');
const triathlonTab = document.getElementById('triathlon');


function changeContent (srcImage,headerText, oldPrice, currentPrice){
    let cards = document.querySelectorAll('.presentation-card__wrap');
    let priceBoxes = document.querySelectorAll('.presentation-card__price');
    cards.forEach((card,index) => {
        let priceBox = priceBoxes[index]
        card.innerHTML = `
            <img src="${srcImage}" alt="pulse-monitor" class="presentation-card__image">
            <div class="presentation-card__header">${headerText}</div>
            <div class="presentation-card__text">For the first steps in heart rate-based training</div>
        `;
        priceBox.innerHTML = `
            <div class="presentation-card__old-price">$${oldPrice}</div>
            <div class="presentation-card__current-price">$${currentPrice}</div>
        `;
    })
};

fitnessTab.addEventListener('click', () => {
    changeContent("images/pulse-monitor/For_Fitness/pulse-monitor.png", "Polar FT1", '52.78', '50.00');
})
runningTab.addEventListener('click', () => {
    changeContent("images/pulse-monitor/For_Running/pulse-monitor.webp", "Suunto M2", '74.33', '73.80');
})
triathlonTab.addEventListener('click', () => {
    changeContent("images/pulse-monitor/For_Triathlon/pulse-monitor.jpg", "Polar FT4", '82.11', '78.00');
})

let isDetailsShown = false;
let isAnimating;



tabs.forEach( tab => {
    tab.addEventListener('click', ()=>{
        tabs.forEach( tabElement => {
            if(tabElement !== this){
                tabElement.classList.remove('clicked')
            };
        });
        if(tab.classList != 'clicked'){
            tab.classList.add('clicked')
        };
    });
});

cardContents.forEach((cardContent, index) => {
    const cardList = cardLists[index];
    const contentChanger = contentChangers[index];
    let isDetailsShown = false;
    let isAnimating = false;

    contentChanger.addEventListener('click', () => {
        if (isAnimating) return;

        // Получаем общее время перехода для текущего cardList
        const computedStyle = window.getComputedStyle(cardList);
        const transitionDuration = parseFloat(computedStyle.transitionDuration) * 1000;
        const transitionDelay = parseFloat(computedStyle.transitionDelay) * 1000;
        const totalTransitionTime = transitionDuration + transitionDelay;

        isAnimating = true;

        if (isDetailsShown === false) {
            setTimeout(() => {
                cardList.classList.remove('hidden');
                contentChanger.innerHTML = 'Go Back';
                isAnimating = false;
            }, totalTransitionTime);
            cardContent.classList.add('hidden');
            isDetailsShown = true;
        } else {
            setTimeout(() => {
                cardContent.classList.remove('hidden');
                contentChanger.innerHTML = 'Details';
                isAnimating = false;
            }, totalTransitionTime);
            cardList.classList.add('hidden');
            isDetailsShown = false;
        }
    });
});