document.addEventListener('DOMContentLoaded', () => {
    const skillboxItems = document.querySelectorAll('.usage__skill-item');
    skillboxItems.forEach(skillboxItem => {
        const skillbarFill = skillboxItem.querySelector('.usage__skill-bar-fill');
        const lvlOfFilling = skillboxItem.querySelector('.usage__skill-lvl').innerHTML;
        skillbarFill.style.width = lvlOfFilling;
    });
});
