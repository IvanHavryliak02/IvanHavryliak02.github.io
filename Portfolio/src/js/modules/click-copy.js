
export default function(elementSelector){
    const element = document.querySelector(elementSelector),
          tooltip = document.querySelector('.tooltip');

    element.addEventListener('click', (e) => {
        navigator.clipboard.writeText(element.innerHTML)
        .then(() => {
            showTooltip(`Copied to clipboard`, tooltip, 1500, e.pageX, e.pageY);
        })
        .catch(() => {
            showTooltip(`Error! Please, copy it manually`, tooltip, 1500, e.pageX, e.pageY);
        })
    });

    function showTooltip(message, tooltipBlock, time, eX, eY){
        tooltipBlock.style.left = `${eX+25}px`;
        tooltipBlock.style.top = `${eY+25}px`;
        tooltipBlock.style.display = 'block'
        tooltipBlock.textContent = message;
        setTimeout(() => {
            tooltipBlock.style.display = 'none'
            tooltipBlock.textContent = '';
        }, time)
    }
}