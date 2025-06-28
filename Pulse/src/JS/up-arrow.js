
$(window).scroll(function (){
    if($(this).scrollTop() > $('.promo').height()){
        $('.uparrow').addClass('active');
    }else{
        $('.uparrow').removeClass('active');
    }
});

//smooth scroll

$('.uparrow').click(function () {
    $('html, body').animate({ scrollTop: 0 }, 'fast');
    return false;
});