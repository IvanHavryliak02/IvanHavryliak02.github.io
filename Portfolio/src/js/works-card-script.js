const myWorksItems = document.querySelectorAll('.works__item');
myWorksItems.forEach(myWorksItem => {
    const infoPanel = myWorksItem.querySelector('.works__card');
    let counter = 0;
    const link = myWorksItem.href
    myWorksItem.addEventListener('click', (event) => {
        event.preventDefault();
        counter +=1
        if(counter == 1){
            infoPanel.style.bottom = '0px'
        }else 
        if(counter == 2){
            window.open(link, '_blank');
            counter = 0;
            infoPanel.style.bottom = '-100%';
        }
    });
});