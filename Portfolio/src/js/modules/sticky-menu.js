
export default function(elementSelector, targetSelector){
    const stickyElement = document.querySelector(elementSelector),
          targetElement = document.querySelector(targetSelector);

    new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(!entry.isIntersecting){
                stickyElement.classList.add('invert-colors');
            }else{
                stickyElement.classList.remove('invert-colors');
            }
        })
    }, {threshold: 0, rootMargin: '0px 0px 0px 0px'}).observe(targetElement)

}