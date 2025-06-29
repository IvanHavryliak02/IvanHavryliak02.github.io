
export default function(sectionSelector){
    const section = document.querySelector(sectionSelector), // .class
          skillItems = section.querySelectorAll(`${sectionSelector}__skill-item`);

    skillItems.forEach(item => {
        const skillBarFill = item.querySelector(`${sectionSelector}__skill-bar-fill`);
        const fillLvl = item.querySelector(`${sectionSelector}__skill-lvl`).innerHTML;
        skillBarFill.style.width = fillLvl;
    })
}