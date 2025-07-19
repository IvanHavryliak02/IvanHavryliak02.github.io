import '../sass/style.sass'

import activateProjectCards from './modules/projects-card.js';
import activateSkillBars from './modules/bar-script.js';
import activateTranslator from './modules/lang-menu.js';
import stiсkyElement from './modules/sticky-menu.js';
import clickCopyFrom from './modules/click-copy.js';
import activateBurger from './modules/burger.js';
import activateSelector from './modules/circular-selector.es.js';

activateSkillBars('.usage');
activateProjectCards('.works');
activateSelector('.works-selector', 
    {
        initDelay: "200ms", 
        menuRadius: "1.1",
        breakpoint: "1200px",
        animationDuration: "800ms",
        childrenTop: '50%', 
        childrenLeft: '50%', 
        startDeg: "-90degs", 
        timingFunc: "easeInOutCubic",
        lineColor: "#FFA501",
        lines: "show" 
    });
activateTranslator('.langmenu');
stiсkyElement('.langmenu','.promo');
clickCopyFrom('.contacts__mail');
activateBurger('.promo', '.menu');