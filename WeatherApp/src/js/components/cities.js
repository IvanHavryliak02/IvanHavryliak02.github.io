
import Component from "../modules/component";
import citiesDB from "../modules/citiesDB";

export default class CitiesDropDown extends Component{

    static isInitialised = false;
    static weatherPromiseStarter = async (lat, long) => {
        try{
            const response = await fetch(`https://api.pen-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,relative_humidity_2m,surface_pressure,visibility,wind_speed_10m,rain,cloud_cover,showers,snowfall,weather_code&timezone=auto`, {
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
                Component.dataOperator.weatherData = data;
            }
            console.log(Component.dataOperator.weatherData)
        }catch(error){
            console.error("Weather API request error:", error.message);
        }
    }

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
           fullStr: undefined,
            cutStr: undefined
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
        let currentValue = input.value;
        return function(){
            if(input.value !== currentValue){
                currentValue = input.value;
                this.createWeatherRequest();
            }
        }
    } 

    async createWeatherRequest(){
        const input = this.input;
        const inputData = input.value.match(/^(.*?),(.*)$/);
        const city = inputData[1].trim();
        const country = inputData[2].trim();
        let lon, lat;
        try{
            const response = await fetch(`https://api.pencagedata.com/geocode/v1/json?q=${city}%2C+${country}&key=6a52067d80dc4a93ac2484d789e46886`,
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
        Component.promisesExecutor.addStarterToQueue(async () => {await CitiesDropDown.weatherPromiseStarter(lat, lon)});
        Component.promisesExecutor.allDone();
    }

    getCurrentLocation(){
        let longitude = '21.011111111', latitude = '52.23', city = 'Warsaw', country = 'Poland';
        const locationPromiseStarter = async () => {
            try{
                const position = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject, {timeout: 5000});
                })
                longitude = position.coords.longitude;
                latitude = position.coords.latitude;
            }catch(error){
                console.warn('Geolocation permissions denied. Default data used.', error.message);
            }

            try{
                const response = await fetch(`https://api.pencagedata.com/geocode/v1/json?q=${latitude}%2C+${longitude}&key=6a52067d80dc4a93ac2484d789e46886&language=en`,
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

            await CitiesDropDown.weatherPromiseStarter(latitude, longitude);
            this.setInputValue(`${city}, ${country}`);
            CitiesDropDown.isInitialised = true;
        }               

        Component.promisesExecutor.addStarterToQueue(locationPromiseStarter);
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
            this.checkChanges();
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

        document.addEventListener('click', (e) => {
            if(e.target !== element){
                arrow.style.transform = 'rotate(0deg)';
                cityList.classList.remove('active');
                search.classList.remove('active');
            }
        })
    }

        getStyles(){
        const parentHeight = Component.publicStyles['#left-panel'].height;
        const fontSize = Math.round(parentHeight * 0.025);
        const lineHeight = fontSize + 5;
        const elementHeight = lineHeight + 10;
        const arrowHeight = fontSize / 2;
        const listElemHeight = elementHeight + 5;
        const listHeight = listElemHeight * 5;
        const borderStyle = '0.5px solid #e4e4e4ff';
        const borderTransparent = '0.5px solid transparent' 

        return {
            fontSize: `${fontSize}px`,
            lineHeight: `${lineHeight}px`,
            background: '#fff',
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
                    background: '#fff',
                    borderRight: borderTransparent,
                    borderBottom: borderTransparent,
                    borderLeft: borderTransparent,
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
                            color: 'inherit',
                            display: 'flex',
                            flex: `0 0 ${listElemHeight}px`,
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'color 0.7s',
                            position: 'relative',
                            overflow: 'visible',
                            borderTop: borderTransparent,
                            borderBottom: borderTransparent,
                            width: '100%',
                            transition: 'all 0.4s',
                            pseudo: {
                                ':hover': {
                                    color: '#000000',
                                    borderTop: borderStyle,
                                    borderBottom: borderStyle,
                                    boxShadow: '0 0 4px #e4e4e4ff'
                                }
                            }
                        },
                    }
                },
                ' .location__search': {
                    height: `${elementHeight}px`,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden',
                    border: borderStyle,
                    borderRadius: '5px 5px 5px 5px',
                    transition: 'border-radius 0.7s',
                    structures: {
                        '.active': {
                            borderRadius: '5px 5px 0 0'
                        }, 
                        ' input': {
                            width: '90%',
                            border: 'none',
                            background: '#fff',
                            height: `100%`,
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
                            height: `100%`,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            structures: {
                                ' .location__arrow': {
                                    color: '#4c4c4c',
                                    fontSize: `${arrowHeight}px`,
                                    transition: 'transform 0.7s',
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}