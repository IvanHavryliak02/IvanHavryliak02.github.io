import '../sass/style.sass'

import activateProjectCards from './modules/projects-card.js';
import activateSkillBars from './modules/bar-script.js';
import activateTranslator from './modules/lang-menu.js';
import stiсkyElement from './modules/sticky-menu.js';

activateSkillBars('.usage');
activateProjectCards('.works');
activateTranslator('.langmenu');
stiсkyElement('.langmenu','.promo');