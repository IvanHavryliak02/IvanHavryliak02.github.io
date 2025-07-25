import '../sass/general.sass';
import currentDay from './components/date.js';

window.addEventListener('load', () => {
    new currentDay(document.querySelector('.app-body__left')).render();
})