
const inputs = document.querySelectorAll('.form__input');
inputs.forEach(input => {
    input.addEventListener('focus', () => {
        const label = input.previousElementSibling;
        label.classList.add('form__label_focused');
    });
    input.addEventListener('blur', () =>{
        if(input.value === ''){
            const label = input.previousElementSibling;
            label.classList.remove('form__label_focused');
        }
    });
});