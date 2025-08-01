import '../sass/general.sass';

import AppBody from './components/app-body.js';
import LeftPanel from './components/left-panel.js';
import RightPanel from './components/right-panel.js';
import CurrentDay from './components/date.js';
import Component from './modules/component.js';



window.addEventListener('load', () => {
    //const start = performance.now();
    new AppBody(document.querySelector('.container'), 'div', '#app-body').render();
    new LeftPanel(document.querySelector('#app-body'), 'div', '#left-panel').render();
    new RightPanel(document.querySelector('#app-body'), 'div', '#right-panel').render();
    new CurrentDay(document.querySelector('#left-panel'), 'span', '#today').render();
    Component.injectCssRules();
    //const end = performance.now();
    //console.log(`Time is ${end - start} ms`)
})