sliderStart("work-slide", "work__dots-container", "work__dot");
sliderStart("gift-slide", "gift__dots-container", "gift__dot");

function sliderStart(privatSlideClass, classDotsContainer, privateDotClass){
    const slidesCollection = document.querySelectorAll(`.${privatSlideClass}`),
          dotsContainer = document.querySelector(`.${classDotsContainer}`);
    createDots(slidesCollection, dotsContainer, privateDotClass);

    const dotsCollection = dotsContainer.querySelectorAll(`.${privateDotClass}`);
    const state = {
        slides: slidesCollection,
        dots: dotsCollection,
        activeSlide: null, 
        activeDot: null,
        indexOfActiveSlide: 0
    }
    indexOfActiveSlide(state);
    makeDotsAlive(state);
    autoSlide(state);
    
};

function createDots(slidesCollection, dotsContainer, privateDotClass){
    for(let i = 0; i < slidesCollection.length; i++){
        dotsContainer.appendChild(document.createElement("div")).classList.add("slider__dot", privateDotClass);
    };
};

function indexOfActiveSlide(state){
    state.slides.forEach((slide, index) => {
        if(slide.classList.contains('active-slide')){
            state.indexOfActiveSlide = index;
            state.activeSlide = slide;
        };
    });
};

function makeDotsAlive(state){
        state.dots.forEach((dot, dotIndex) => {
        if(dotIndex == state.indexOfActiveSlide){
            dot.classList.add('dot-active');
            state.activeDot = dot;
        };
        dot.addEventListener('click', () => {
            state.activeDot.classList.remove('dot-active');
            dot.classList.add('dot-active');
            state.activeDot = dot;
            state.slides.forEach((slide, SlideIndex) => {
                if(SlideIndex == dotIndex){
                    state.activeSlide.classList.remove('active-slide');
                    slide.classList.add('active-slide');
                    state.activeSlide = slide;
                };
            });
        });
    });
};

function autoSlide(state){
    setInterval(() => {
        if(state.activeSlide.nextElementSibling){
            state.activeSlide.classList.remove('active-slide');
            state.activeDot.classList.remove('dot-active');
            state.activeSlide.nextElementSibling.classList.add('active-slide');
            state.activeDot.nextElementSibling.classList.add('dot-active');
            state.activeSlide = state.activeSlide.nextElementSibling;
            state.activeDot = state.activeDot.nextElementSibling;
        }else{
            state.activeSlide.classList.remove('active-slide');
            state.activeDot.classList.remove('dot-active');
            state.activeSlide.parentElement.firstElementChild.classList.add('active-slide');
            state.activeDot.parentElement.firstElementChild.classList.add('dot-active');
            state.activeSlide = state.activeSlide.parentElement.firstElementChild;
            state.activeDot = state.activeDot.parentElement.firstElementChild;
        };
    }, 3500);
};

