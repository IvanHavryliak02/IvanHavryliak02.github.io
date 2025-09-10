


export default () => {
    document.addEventListener('keydown', (e) => {
        if(e.key === 'Escape'){
            const content = [
                document.querySelector('#left-panel'),
                document.querySelector('#right-panel'),
                document.querySelector('#value-switch'),
                document.querySelector('.right-panel__container'),
                document.querySelector('.right-panel__more-container'),
                document.querySelector('#return')
            ]
            content.forEach(item => item.classList.remove('more'));
        }
    })
}
