import '../sass/general.sass';
import unitChecker from './modules/unit-checker.js';
import userData from './modules/user-data.js';

import LoadingScreen from './components/loading-screen.js';
import Component from './modules/component.js';
import AppBody from './components/app-body.js';
import LeftPanel from './components/left-panel.js';
import RightPanel from './components/right-panel.js';
import CurrentDay from './components/day-time.js';
import CitiesDropDown from './components/cities.js';
import CurrentDate from './components/date.js';
import Container from './components/container.js';
import WeatherNow from './components/weather-now.js';
import ItemsBlock from './components/items-block.js';
import ValueCard from './components/value-card.js';
import ShowMore from './components/more.js';
import ValueSwitch from './components/value-switch.js';
import HourlyCard from './components/hourly-card.js';
import ScrollContainer from './components/scroll-container.js';
import DailyCard from './components/daily-card.js';
import Chart from './components/chart.js';
import ReturnButton from './components/return-button.js';
import addGlobalListeners from './modules/global-listeners.js';



window.addEventListener('load', () => {
    userData.getUserData();

    Component.setLoader(new LoadingScreen(document.querySelector('body'), 'div', '#load-screen').render())
    Component.injectCssRules();

    new Container(document.querySelector('body'), 'div', '.container').render();

    new AppBody(document.querySelector('.container'), 'div', ['#app-body','.hide']).render();

    new LeftPanel(document.querySelector('#app-body'), 'div', ['#left-panel']).render();
    new RightPanel(document.querySelector('#app-body'), 'div', ['#right-panel']).render();

    new CurrentDay(document.querySelector('#left-panel'), 'span', '#today').render();
    new CitiesDropDown(document.querySelector('#left-panel'), 'span', '#location').render();
    new CurrentDate(document.querySelector('#left-panel'), 'span', '#date').render();
    new WeatherNow(document.querySelector('#left-panel'), 'div', '#now').render();
    new ReturnButton(document.querySelector('#left-panel'), 'div', '#return').render();
    
    new ValueSwitch(document.querySelector('#right-panel'), 'div', ['#value-switch']).render();
    new ItemsBlock(document.querySelector('.right-panel__container'), 'div', ['#conditions', '.conditions_modif'], 'Atmospheric conditions').render();

    new ValueCard(
        document.querySelector('.conditions__container'),
        'div',
        '#value-card-hum',
        'Humidity, %',
        () => {
            const data = Component.dataOperator.APIData;
            const hour = userData.hour;
            const value = data.hourly.relative_humidity_2m[hour]
            return value;
        },
        {
            startPoint: '50%',
            min: 0,
            max: 100,
            dividerShow: true,
        }
    ).render();

    new ValueCard(
        document.querySelector('.conditions__container'),
        'div',
        '#value-card-press',
        'Pressure, hPa',
        () => {
            const data = Component.dataOperator.APIData;
            const hour = userData.hour;
            const value = data.hourly.surface_pressure[hour]
            return Math.round(value);
        },
        {
            startPoint: '50%',
            min: 963,
            max: 1063,
            dividerShow: true,
        }
    ).render();

    new ValueCard(
        document.querySelector('.conditions__container'),
        'div',
        '#value-card-vis',
        'Visibility, km',
        () => {
            const data = Component.dataOperator.APIData;
            const hour = userData.hour;
            const value = data.hourly.visibility[hour]
            return Math.floor(value / 1000);
        },
        {
            startPoint: '0%',
            min: 0,
            max: 10,
            dividerShow: false,
        }

    ).render();

    new ValueCard(
        document.querySelector('.conditions__container'),
        'div',
        '#value-card-wind',
        'Wind speed, km/h',
        () => {
            const data = Component.dataOperator.APIData;
            const hour = userData.hour;
            const value = data.hourly.wind_speed_10m[hour]
            return Math.round(value);
        },
        {
            startPoint: '0%',
            min: 0,
            max: 40,
            dividerShow: false,
        }

    ).render();
    new ShowMore(
        document.querySelector('.conditions__container'),
        'div',
        '#show-more'
    ).render();


    new ItemsBlock(document.querySelector('.right-panel__container'), 'div', '#hourly', 'Hourly weather').render();
    new ScrollContainer(document.querySelector('.hourly__container'), 'div', '.hourly__scroll').render();
    for (let i = 0; i < 24; i++) {
        new HourlyCard(
            document.querySelector('.hourly__scroll__content'),
            'div',
            '.hourly-card',
            i
        ).render();
    }

    new ItemsBlock(document.querySelector('.right-panel__container'), 'div', '#daily', 'Daily weather').render();
    new ScrollContainer(document.querySelector('.daily__container'), 'div', '.daily__scroll').render();
    for (let i = 0; i < 7; i++) {
        new DailyCard(
            document.querySelector('.daily__scroll__content'),
            'div',
            '.daily-card',
            i
        ).render();
    }

    new ItemsBlock(document.querySelector('.right-panel__more-container'), 'div', ['#hourly-trend', '.trend_modif'], 'Hourly Maximum Temperature Trend').render();
    new ScrollContainer(document.querySelector('.hourly-trend__container'), 'div', ['.hourly-scroll', '.scroll_modif'], {bottom: '-50px', left: '0'}).render()
    new Chart(
        document.querySelector('.hourly-scroll__content'),
        'div',
        '#hourly-chart',
        () => {
            const data = Component.dataOperator.APIData;
            const dataXArr = data.hourly.time;
            const dataYArr = data.hourly.temperature_2m
            const x = [], y = [];
            for (let i = 0; i < 24; i++) {
                x.push(dataXArr[i].match(/\d{2}:\d{2}/)[0])
                y.push(unitChecker.calculateTemp(dataYArr[i]));
            }
            return {
                x: x,
                y: y
            }
        }
    ).render();

    new ItemsBlock(document.querySelector('.right-panel__more-container'), 'div', ['#daily-trend', '.trend_modif'], 'Daily Maximum Temperature Trend').render();
    new ScrollContainer(document.querySelector('.daily-trend__container'), 'div', ['.daily-scroll', '.scroll_modif'], {bottom: '-50px', left: '0'}).render()
    new Chart(
        document.querySelector('.daily-scroll__content'),
        'div',
        '#hourly-chart',
        () => {
            const data = Component.dataOperator.APIData;
            const dataYArr = data.daily.temperature_2m_max
            const x = [], y = [];

            const userDay = userData.weekday;
            for (let i = 0; i < 7; i++) {
                let day = userDay + i;
                day = day >= 7 ? day - 7 : day;
                x.push(userData.findWeekday(day).slice(0, 3))
                y.push(unitChecker.calculateTemp(dataYArr[i]));
            }
            return {
                x: x,
                y: y
            }
        }
    ).render();

    Component.injectCssRules();
    Component.clearResurses();
    Component.promisesExecutor.allDone();
    addGlobalListeners();
})