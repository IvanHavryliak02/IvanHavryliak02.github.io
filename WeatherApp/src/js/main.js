import '../sass/general.sass';

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



window.addEventListener('load', () => {
    console.log('Loading...');
    console.time('timer');
    Component.dataOperator.userTime.getUserDate();
    
    new Container(document.querySelector('body'), 'div', '.container').render();

    new AppBody(document.querySelector('.container'), 'div', '#app-body').render();

    new LeftPanel(document.querySelector('#app-body'), 'div', ['#left-panel', '.more']).render();
    new RightPanel(document.querySelector('#app-body'), 'div', ['#right-panel', '.more']).render();

    new CurrentDay(document.querySelector('#left-panel'), 'span', '#today').render();
    new CitiesDropDown(document.querySelector('#left-panel'), 'span', '#location').render();
    new CurrentDate(document.querySelector('#left-panel'), 'span', '#date').render();
    new WeatherNow(document.querySelector('#left-panel'), 'div', '#now').render();

    new ValueSwitch(document.querySelector('#right-panel'), 'div', ['#value-switch', '.more']).render();
    new ItemsBlock(document.querySelector('.right-panel__container'), 'div', '#conditions', 'Atmospheric conditions').render();
    new ValueCard(
        document.querySelector('.conditions__container'), 
        'div', 
        '#value-card-hum', 
        'Humidity, %',
        () => {
            const data = Component.dataOperator.weatherData;
            const hour = Component.dataOperator.userTime.hour;
            const value = data.hourly.relative_humidity_2m[hour]
            return value;
        },
        {
            background: '#ffc300', 
            startPoint: '50%',
            min: 5,
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
            const data = Component.dataOperator.weatherData;
            const hour = Component.dataOperator.userTime.hour;
            const value = data.hourly.surface_pressure[hour]
            return Math.round(value);
        },
        {
            background: '#ffc300', 
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
            const data = Component.dataOperator.weatherData;
            const hour = Component.dataOperator.userTime.hour;
            const value = data.hourly.visibility[hour]
            return Math.floor(value/1000);
        },
        {
            background: '#ffc300', 
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
            const data = Component.dataOperator.weatherData;
            const hour = Component.dataOperator.userTime.hour;
            const value = data.hourly.wind_speed_10m[hour]
            return Math.round(value);
        },
        {
                background: '#ffc300', 
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
    for(let i = 0; i < 24; i++){
        new HourlyCard(
            document.querySelector('.hourly__scroll__content'), 
            'div', 
            '.hourly-card', 
            i
        ).render();
    }

    new ItemsBlock(document.querySelector('.right-panel__container'), 'div', '#daily', 'Daily weather').render();
    new ScrollContainer(document.querySelector('.daily__container'), 'div', '.daily__scroll').render();
    for(let i = 0; i < 7; i++){
        new DailyCard(
            document.querySelector('.daily__scroll__content'), 
            'div', 
            '.daily-card', 
            i
        ).render();
    }


    Component.injectCssRules();
    Component.promisesExecutor.allDone();

    console.timeEnd('timer')
})