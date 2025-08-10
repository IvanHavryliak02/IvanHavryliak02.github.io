import '../sass/general.sass';

import AppBody from './components/app-body.js';
import LeftPanel from './components/left-panel.js';
import RightPanel from './components/right-panel.js';
import CurrentDay from './components/day-time.js';
import Component from './modules/component.js';
import CitiesDropDown from './components/cities.js';
import CurrentDate from './components/date.js';


window.addEventListener('load', () => {
    console.log('Loading...');
    //console.time('timer');
    new AppBody(document.querySelector('.container'), 'div', '#app-body').render();

    new LeftPanel(document.querySelector('#app-body'), 'div', '#left-panel').render();
    new RightPanel(document.querySelector('#app-body'), 'div', '#right-panel').render();

    new CurrentDay(document.querySelector('#left-panel'), 'span', '#today').render();
    new CitiesDropDown(document.querySelector('#left-panel'), 'span', '#location').render();
    new CurrentDate(document.querySelector('#left-panel'), 'span', '#date').render();
    
    Component.injectCssRules();
    Component.promisesExecutor.allDone();

    //console.timeEnd('timer')
})