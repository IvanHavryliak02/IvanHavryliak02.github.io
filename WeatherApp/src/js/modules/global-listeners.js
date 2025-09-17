


export default () => {
    let timer;
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
    window.addEventListener('resize', () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            if(window.innerWidth >= 1200){ 
                location.reload()
            }
        }, 200)
    })
}
