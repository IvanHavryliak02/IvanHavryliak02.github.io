import '../sass/general.sass';

import AppBody from './components/app-body.js';
import LeftPanel from './components/left-panel.js';
import RightPanel from './components/right-panel.js';
import CurrentDay from './components/date.js';


window.addEventListener('load', () => {
    new AppBody(document.querySelector('.container')).render();
    new LeftPanel(document.querySelector('.app-body')).render();
    new RightPanel(document.querySelector('.app-body')).render();
    new CurrentDay(document.querySelector('.left-panel')).render();
})