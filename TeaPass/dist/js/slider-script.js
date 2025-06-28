function sliderSet(privateSlideClass, classDotsContainer, privateDotClass){
    let activeDot = null;
    let activeSlide = null;                  
    const slidesCollection = document.querySelectorAll("." + privateSlideClass); 
    const dotsContainer = document.querySelector("." + classDotsContainer); 
    for(let i = 0; i < slidesCollection.length; i++){
        dotsContainer.appendChild(document.createElement("div")).classList.add("slider__dot", privateDotClass);
    }
    let indexOfActive = 0;
    slidesCollection.forEach((slide, index) => {
        if(slide.classList.contains('active-slide')){
            indexOfActive = index;
            activeSlide = slide;
        }
    });
    const dotsCollection = dotsContainer.querySelectorAll("." + privateDotClass);
    
    dotsCollection.forEach((dot, dotIndex) => {
        if(dotIndex == indexOfActive){
            dot.classList.add('dot-active');
            activeDot = dot;
        }
        dot.addEventListener('click', () => {
            activeDot.classList.remove('dot-active')
            dot.classList.add('dot-active');
            activeDot = dot;
            slidesCollection.forEach((slide, SlideIndex) => {
                if(SlideIndex == dotIndex){
                    activeSlide.classList.remove('active-slide');
                    slide.classList.add('active-slide');
                    activeSlide = slide;
                };
            });
            console.log(activeDot, activeSlide);
        });
    });
};

sliderSet("work-slide", "work__dots-container", "work__dot");
sliderSet("gift-slide", "gift__dots-container", "gift__dot");

