
const mailBlock = document.querySelector(".contacts__mail");
const tooltip = document.querySelector('.tooltip');

mailBlock.addEventListener("click", event => {
    tooltip.style.display = 'block';
    navigator.clipboard.writeText(mailBlock.innerText).then(function() {
        tooltip.innerHTML="Copied to clipboard";
        tooltip.style.left = event.pageX + 15 + 'px';
        tooltip.style.top = event.pageY + 20 + 'px';
    }).catch(function(error) {
        tooltip.innerHTML="Error";
    });
    setTimeout(() => {
        tooltip.style.display = 'none';
    }, 1500); 
});