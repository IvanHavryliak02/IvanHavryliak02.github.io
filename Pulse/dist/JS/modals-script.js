
const modalCallbackTriggers = document.querySelectorAll('[data-callback="callback-button"]');
const modalInfo = document.getElementById('modal-info');
const modalCallback = document.getElementById('modal-callback');
const modalOrder = document.getElementById('modal-order');
const modalBg = document.getElementById('modal-bg');
const modalCloseTriggers = document.querySelectorAll('.modal__exit');
const modalOrderTriggers = document.querySelectorAll('.button_mini');
const modalInfoTriggers = document.querySelectorAll('.button_submit');

modalCallbackTriggers.forEach(modalTrigger => {
    modalTrigger.addEventListener('click', () => {
        modalCallback.classList.add('showed')
        modalBg.classList.add('showed');

    })
});

modalCloseTriggers.forEach(modalCloseTrigger => {
    modalCloseTrigger.addEventListener('click', () => {
        modalOrder.classList.remove('showed')
        modalInfo.classList.remove('showed') 
        modalCallback.classList.remove('showed')
        modalBg.classList.remove('showed')
    })
})
//.presentation-card
modalOrderTriggers.forEach(modalOrderTrigger => {
    modalOrderTrigger.addEventListener('click',() => {
        const currentCard = modalOrderTrigger.closest('.presentation-card');
        const currentMonitor = currentCard.querySelector('.presentation-card__header').innerHTML;
        modalBg.classList.add('showed');
        modalOrder.classList.add('showed');
        modalOrder.querySelector('.modal__subheader').innerHTML = `Pulse monitor ${currentMonitor}`;
        modalOrder.querySelector('.button_modal').innerHTML = `Buy`;
    })
})

$('.form__input-wrapper .form__label').each(function() {
    $(this).data('original-text', $(this).text());
});

function validity(formIdName) {
    $(formIdName).validate({
        rules: {
            username: {
                required: true,
                lettersonly: true
            },
            phoneNumber: {
                required: true,
                phone: true
            },
            email: {
                required: true,
                email: true
            }
        },
        messages: {
            username: "A name such as this cannot exist",
            phoneNumber: "Phone number is not correct",
            email: "Email adress is not correct"
        },
        errorPlacement: function(error, element) {
            let label = element.closest('.form__input-wrapper').find('.form__label');
            label.text(error.text());
        },
        highlight: function(element, errorClass, validClass) {
            $(element).addClass(errorClass).removeClass(validClass);
            let label = $(element).closest('.form__input-wrapper').find('.form__label');
            label.addClass('error-message');
        },
        unhighlight: function(element, errorClass, validClass) {
            let label = $(element).closest('.form__input-wrapper').find('.form__label');
            let originalText = label.data('original-text');
            label.removeClass('error-message').text(originalText);
            $(element).removeClass(errorClass).addClass(validClass);
        }
    });
    $.validator.addMethod("lettersonly", function(value, element) {
        return this.optional(element) || /^[a-zA-Z\s]+$/.test(value);
    });

    $.validator.addMethod("phone", function(value, element) {
        return this.optional(element) || /^\+\d{10,15}$/.test(value);
    });
    $.validator.addMethod("emailDomain", function(value, element) {
        return this.optional(element) || /@gmail\.com$/.test(value) || /@[\w-]+\.[a-zA-Z]{2,}$/.test(value);
    });
}

validity('#callback-section-form');
validity('#order-form');
validity('#callback-form');

$('form').submit(function(e){
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize()
    }).done(function(){
        $(this).find("input").val("");
        $('.form__label').removeClass('form__label_focused');
        $('#modal-callback, #modal-order').removeClass('showed');
        $('#modal-info, #modal-bg').addClass('showed');
        $('form').trigger('reset');
    });
    return false;
})