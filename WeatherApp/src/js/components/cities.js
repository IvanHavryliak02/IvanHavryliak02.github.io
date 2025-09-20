
import Component from "../modules/component.js";
import citiesDB from "../modules/citiesDB.js";
import userData from "../modules/user-data.js";

export default class CitiesDropDown extends Component{

    static isInitialised = false;

    constructor(parent, elementType, selector){
        super(parent, elementType, selector);
        this.element = this.createElement(`
            <div class="location__search">
                <input>
                <div class="location__dropdown">
                    <span class="icon-dropdown location__arrow"></span>
                </div>
            </div> 
            <ul class="location__list"></ul>`
        );
        this.inputData = {
           fullStr: null,
            cutStr: null
        }
        this.input = this.element.querySelector('input');
        this.styles = this.getStyles();
        this.checkChanges = this.checkInput();
        this.getCurrentLocation();
        this.createCitiesList();
        this.addListeners();
        this.applyStyles();
    };

    checkInput(){
        const input = this.input;
        const search = this.element.querySelector('.location__search')
        let oldValue = input.value;
        return function(newValue){
            if(newValue !== oldValue){
                if(/[,\s]/.test(newValue)){
                    this.createWeatherRequest();
                    search.style.border = '1px solid #e4e4e4ff';
                    oldValue = newValue;
                }else{
                    search.style.border = '1px solid red'
                }
                
            }
        }
    } 

    setInputValue(originalString){
        const input = this.input;
        if(originalString.length >= 18){
            this.inputData.fullStr = originalString;
            input.value = originalString.slice(0,16) + '..';
            this.inputData.cutStr = input.value;
        }else{
            input.value = originalString;
        }
        if(CitiesDropDown.isInitialised){
            this.checkChanges(originalString);
        }
    }

    getCurrentLocation(){
        let longitude = '21.011111111', latitude = '52.23', city = 'Warsaw', country = 'Poland';
        const locationPromiseStarter = async () => {
            try{
                const position = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject);
                })
                longitude = position.coords.longitude;
                latitude = position.coords.latitude;
            }catch(error){
                console.warn('Geolocation permissions denied. Default data used.', error.message);
            }

            try{
                const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}%2C+${longitude}&key=6a52067d80dc4a93ac2484d789e46886&language=en`,
                {
                    method: 'GET',
                    headers: {
                        'Content-type':'application/json'
                    }
                })
                const data = await response.json();
                city = data.results[0].components.city || city
                country = data.results[0].components.country || country
            }catch(error){
                console.error(`Geocoding API error during initialisation:`, error.message);
            }

            await this.weatherPromiseStarter(latitude, longitude);
            this.setInputValue(`${city}, ${country}`);
            CitiesDropDown.isInitialised = true;
        }               

        Component.promisesExecutor.addStarterToQueue(locationPromiseStarter);
    }

    weatherPromiseStarter = async (lat, long) => {
        try{
            const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,relative_humidity_2m,surface_pressure,visibility,wind_speed_10m,weather_code&timezone=auto`, {
                method: 'GET',
                headers: {
                    'Content-type':'application/json'
                }
            })
            const data = await response.json();
            if(!lat || !long){
                console.error(`This error must have occured due to a bad response from the geocoding API.`)
            }
            if(!data.error){
                Component.dataOperator.APIData = data;
            }
        }catch(error){
            console.error("Weather API request error:", error.message);
        }
    } 

    async createWeatherRequest(){
        let lon, lat;
        try{
            const input = this.input;
            const inputData = input.value.match(/^(.*?),(.*)$/) || input.value.match(/^(.*?)\s(.*)$/);
            const city = inputData[1].trim();
            const country = inputData[2].trim();
            const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${city}%2C+${country}&key=6a52067d80dc4a93ac2484d789e46886`,
            {
                method: 'GET',
                headers: {
                    'Content-type':'application/json'
                }
            })
            const data = await response.json();
            const coords = data.results[0].geometry;
            lon = coords.lng;
            lat = coords.lat;
        }catch(error){
            console.error('Geocoding API error before making weather request:', error.message);
        }
        Component.promisesExecutor.addStarterToQueue(async () => {await this.weatherPromiseStarter(lat, lon)});
        Component.promisesExecutor.allDone();
    }

    createCitiesList(){
        const list = this.element.querySelector('.location__list');

        function createSpan(className, content){
            const span = document.createElement('span');
            span.textContent = content;
            span.classList.add(className);
            return span;
        }

        for(let city in citiesDB){
            const listItem = document.createElement('div');
            listItem.classList.add('location__list-item');
            listItem.appendChild(createSpan('location__city', city));
            listItem.innerHTML += ', ';
            listItem.appendChild(createSpan('location__country', citiesDB[city].country));
            list.appendChild(listItem);
        }

    }

    addListeners(){

        const element = this.element;
        const arrow = element.querySelector('.location__arrow');
        const search = element.querySelector('.location__search');
        const cityList = element.querySelector('.location__list');
        const input = this.input;

        const inputData = this.inputData;
        
        search.addEventListener('click', (e) => {
            e.stopPropagation();
            arrow.style.transform = 'rotate(90deg)';
            search.classList.add('active');
            cityList.classList.add('active');
        })

        cityList.addEventListener('click', (e) => {
            const element = e.target.closest('.location__list-item');
            if(element){
                const city = element.querySelector('.location__city').textContent;
                const country = element.querySelector('.location__country').textContent;
                this.setInputValue(`${city}, ${country}`);
            }
        })

        input.addEventListener('focus', () => {
            if(inputData.cutStr === input.value){
                input.value = inputData.fullStr; 
            }
        })

        input.addEventListener('blur', () => {
            if(inputData.fullStr === input.value){
                input.value = inputData.cutStr; 
            }else{
                this.setInputValue(input.value); 
            }
        })

        input.addEventListener('keydown', (e) => {
            if(e.key === 'Enter'){
                input.blur();
                cityList.classList.remove('active');
                search.classList.remove('active')
            }
        })

        document.addEventListener('click', (e) => {
            if(e.target !== element){
                arrow.style.transform = 'rotate(0deg)';
                cityList.classList.remove('active');
                search.classList.remove('active');
            }
        })
    }

    getStyles(){
        const scale = userData.scale;
        const fontSize = 29 * scale;
        const itemFontSize = fontSize - 3;
        
        const lineHeight = fontSize + 5 * scale;
        const elementHeight = lineHeight + 10 * scale;
        const borderRadius = 5 * scale;
        const arrowHeight = fontSize / 2;
        const listElemHeight = elementHeight + 5 * scale;
        const listHeight = listElemHeight * 5;
        const itemBoxShadow = '0 0 4px #e4e4e4ff';

        const theme = userData.theme;
        const listBg = theme === 'light' ? '#ffffff' : '#4c4c4c';
        const arrowColor = theme === 'light' ? '#4c4c4c' : '#ffffff';
        const listItemColor = theme === 'light' ? 'inherit' : '#dfdfdfff';
        const hoverColor = theme === 'light' ? '#000000' : '#ffffff';
        const borderStyle = '0.5px solid #e4e4e4ff';
        const borderTransparent = '0.5px solid transparent' 

        return {
            fontSize: `${fontSize}px`,
            lineHeight: `${lineHeight}px`,
            background: 'transparent',
            height: `${elementHeight}px`,
            pseudo: {
                ':hover': {
                    cursor: 'pointer'
                }
            },
            structures: {
                ' .location__list': {
                    transition: 'all 0.7s',
                    overflow: 'hidden',
                    height: '0',
                    opacity: '0',
                    transform: 'translateZ(0)',
                    willChange: 'height',
                    listStyle: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    background: listBg,
                    structures: {
                        '.active': {
                            borderRight: borderStyle,
                            borderBottom: borderStyle,
                            borderLeft: borderStyle,
                            height: `${listHeight}px`,
                            opacity: '1',
                            overflow: 'auto',
                            '-ms-overflow-style': 'none',
                            scrollbarWidth: 'none',
                            pseudo: {
                                '::-webkit-scrollbar': {
                                    width: '0',
                                    height: '0'
                                }
                            }
                        },
                        ' .location__list-item': {
                            fontSize: `${itemFontSize}px`,
                            color: listItemColor,
                            display: 'flex',
                            flex: `0 0 ${listElemHeight}px`,
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            overflow: 'visible',
                            borderTop: borderTransparent,
                            borderBottom: borderTransparent,
                            width: '100%',
                            transition: 'all 0.4s',
                            pseudo: {
                                ':hover': {
                                    color: hoverColor,
                                    borderTop: borderStyle,
                                    borderBottom: borderStyle,
                                    boxShadow: itemBoxShadow,
                                }
                            }
                        },
                    }
                },
                ' .location__search': {
                    height: `100%`,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden',
                    border: borderStyle,
                    borderRadius: `${borderRadius}px`,
                    transition: 'border-radius 0.7s',
                    structures: {
                        '.active': {
                            borderRadius: `${borderRadius}px ${borderRadius}px 0 0`
                        }, 
                        ' input': {
                            width: '90%',
                            height: '100%',
                            border: 'none',
                            background: 'transparent',
                            textAlign: 'center',
                            fontSize: 'inherit',
                            color: 'inherit',
                            pseudo: {
                                ':focus': {
                                    outline: 'none'
                                }
                            }
                        },
                        ' .location__dropdown': {
                            width: '10%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: `${arrowHeight}px`,
                            structures: {
                                ' .location__arrow': {
                                    color: arrowColor,
                                    transition: 'transform 0.7s',
                                }
                            }
                        },
                    }
                }
            },
            media: {
                'max-width: 1200px': {
                    height: '40px',
                    fontSize: '24px',
                    structures: {
                        ' .location__list .location__list-item': {
                            fontSize: '20px',
                            flex: '0 0 40px'
                        },
                        ' .location__search': {
                            borderRadius: `7px`,
                            structures: {
                                '.active': {
                                    borderRadius: `7px 7px 0 0`,
                                    
                                },
                                ' .location__dropdown': {
                                    fontSize: '10px'
                                } 
                            }
                        },
                        ' .location__list.active': {
                            height: '213px',
                        }
                    }
                }
            }
        }
    }
}