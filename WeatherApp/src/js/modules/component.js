
import createStyleSheet from './sheet-gen.js';

const styleBuffer = {};

function getStyleSheet(){
    let styleSheet = document.querySelector('#components-styles');
    if(!styleSheet){
        return createStyleSheet();
    }
    return styleSheet.sheet;
}


export default class Component{

    static styleSheet = getStyleSheet();
    static publicStyles = {};
    static dataOperator = {
        weatherData: '',
        weatherSubs: [],
        dataIsReady: async function(){
            Promise.all(this.weatherSubs.map(startPromise => startPromise()))
            .then(() => {
                console.log('loaded');
            }).catch((error) => console.error("Can't find data at weather data object:", error.message))
        },
        subscribe: function (subscriberFunc){
            this.weatherSubs.push(subscriberFunc);
        },
        unitChecker: {
            unit: 'cels',
            calculateTemp: function(temp) {
                if(this.unit === 'cels'){
                    return temp;
                }else {
                    return Math.round((temp * 1.8 + 32)*10)/10 
                }
            }
        },
        userData: {
            month: '',
            date: '',
            weekday: '',
            hour: '',
            theme: '',
            scale: '',
            getUserData: function (){
                const date = new Date();
                this.date = date.getDate();
                this.month = date.getMonth();
                this.weekday = date.getDay();
                this.hour = date.getHours();
                this.theme = this.hour >= 18 || this.hour <= 6 ? 'dark' : 'light';
                this.wievportWidth = window.innerWidth;
                this.wievportHeight = window.innerHeight;
                const scaleX = window.innerWidth / 1920;
                const scaleY = window.innerHeight / 1080;
                this.scale = Math.round(Math.min(scaleX, scaleY)*100)/100
            },
            findWeekday: function(i = 'none'){
                const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
                if(i === 'none'){
                    return days[this.weekday]
                }else{
                    return days[i];
                } 
            }
        },
        weatherDecoder:{ 
            weatherCodes: {
                    precised: {
                        0: 'sun.svg',
                        1: 'part-cloud.svg',
                        3: 'cloud.svg',
                        11: 'fog.svg',
                        17: 'lightning.svg',
                        19: 'tornado.svg',
                        51: 'drizzle.svg',
                        62: 'rain-cloud.svg',
                        72: 'snow.svg',
                        95: 'storm.svg',
                        101: 'hot.svg',
                    },
                    general: {
                        0: 'sun.svg',
                        20: 'cloud.svg',
                        30: 'haze.svg',
                        40: 'fog.svg',
                        50: 'drizzle.svg',
                        60: 'rain-cloud.svg',
                        70: 'snow.svg',
                        80: 'storm.svg',
                        90: 'storm.svg'
                    }
                },
            whatsImage: function(code, temp){
                let primeRes;
                if(code === 0 && temp > 28){
                    primeRes = 'hot.svg';
                }else if(this.weatherCodes.precised[code]){
                    primeRes = this.weatherCodes.precised[code]
                }else{
                    primeRes = this.weatherCodes.general[Math.floor(code/10)*10]
                }
                return primeRes;
            }
        }
    };

    static promisesExecutor = {
        promisesQueue: [],
        addStarterToQueue: function(promiseStarter){
            this.promisesQueue.push(promiseStarter);
        },
        allDone: function(){
            const promises = this.promisesQueue.map(startPromise => startPromise());
            this.promisesQueue = [];
            Promise.all(promises)
            .then(() => {
                Component.dataOperator.dataIsReady();
            })
            .catch((error) => console.error(`Request error:`, error));
        }
    };

    static injectCssRules(){
        const restRules = [];
        for(let selector in styleBuffer){
            if(typeof styleBuffer[selector] !== 'object' ){
                const newRule = `${selector}{${styleBuffer[selector]}}`;
                Component.styleSheet.insertRule(newRule, this.styleSheet.cssRules.length)
                //console.log(newRule);
            }else{
                let mediaBody = '';
                const mediaRules = styleBuffer[selector];
                for(let selector in mediaRules){
                    mediaBody += `\n${selector}{${mediaRules[selector]}}`
                }
                restRules.push(`${selector}{${mediaBody}}`)
            }
        }
        for(let restRule of restRules){
            Component.styleSheet.insertRule(restRule, this.styleSheet.cssRules.length)
            //console.log(restRule)
        }
    };

    constructor(parent, elementType, elementSelector){
        this.parent = parent;
        this.elementType = elementType;
        this.elementSelector = elementSelector;
    }

    makeStylesPublic(elementSelector, styles){
        if(!Component.publicStyles[elementSelector]){
            Component.publicStyles[elementSelector] = styles;
        }
    }

    createElement(innerCode = ''){

        const element = document.createElement(this.elementType);

        const addSelector = (selector) => {
            if(selector.startsWith('.')){
                element.classList.add(`${selector.slice(1)}`);
            }else if(selector.startsWith('#')){
                element.id = `${selector.slice(1)}`;
            }
        }

        if(Array.isArray(this.elementSelector)){
            this.elementSelector.forEach(selector => {
                addSelector(selector);
            });
        }else{
            addSelector(this.elementSelector);
        }

        element.innerHTML = innerCode;
        return element;
    }

    applyStyles(){
        const selector = Array.isArray(this.elementSelector) ? this.elementSelector[0] : this.elementSelector;
        const styles = this.styles;
        if(!styles){
            console.error(`Can't find styles object of ${this.elementType}, selector: ${this.elementSelector}`);
        }

        createRules(styles, selector);

        function createRules(obj, header, media = ''){

            addStylesRule(obj, header);

            for(let prop in obj){
                if(prop === 'pseudo'){
                    const pseudoes = obj[prop];
                    for(let pseudo in pseudoes){
                        const newHeader = `${header}${pseudo}`
                        
                        //addStylesRule(pseudoes[pseudo], newHeader);
                        createRules(pseudoes[pseudo], newHeader, media);
                    }
                }
                if(prop === 'structures'){
                    const structures = obj[prop];

                    for(let structure in structures){
                        createRules(structures[structure], `${header}${structure}`, media);
                    }
                }
                if(prop === 'media'){
                    const media = obj[prop];
                    
                    for(let mediaRule in media){
                        const mediaHeader = `@media ${mediaRule}`;
                        createRules(media[mediaRule],`${header}`, mediaHeader);
                    }

                }
            }

            function addStylesRule(localeObj, localeHeader){
                const props = createCssProps(localeObj);
                if(props){
                    if(media){ 
                        if(!styleBuffer[media]){
                            styleBuffer[media] = {};
                        }
                        const mediaObj = styleBuffer[media];
                        if(!mediaObj[localeHeader]){
                            mediaObj[localeHeader] = props;
                        }
                    }else{
                        if(!styleBuffer[localeHeader]){
                            styleBuffer[localeHeader] = props;
                        }
                    }
                }
            }
        }

        function createCssProps(obj){
            let result = ''
            for(let prop in obj){
                if(typeof obj[prop] !== 'object'){
                    const cssProp = convCamelToKebab(prop);
                    const value = obj[prop];
                    result += `${cssProp}:${value};`
                }
            }
            return result;
        }

        function convCamelToKebab(camelExp){ 
            return camelExp.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`);
        }

    }

    render(){
        this.parent.appendChild(this.element);
    }
}