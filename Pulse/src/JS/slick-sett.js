$(document).ready(function(){
    $('.presentation__carousel').slick({
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/arrow.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/arrow.svg"></button>',
        responsive: [
            {
              breakpoint: 768,
              settings: {
                arrows: false,
                dots: true
              }
            }
        ]
    });
  });