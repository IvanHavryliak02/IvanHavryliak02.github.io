
import Component from "../modules/component";
import citiesDB from "../modules/citiesDB";

export default class CitiesDropDown extends Component{
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
                console.log('Input was changed');
                currentValue = input.value;
            }
        }
    } 

    getCurrentLocation(){
        let longitude = '21.011111111', latitude = '52.23', city = 'Your city', country = 'Country';
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
                console.error(`Geocoding API error:`, error.message);
            }

            this.setInputValue(`${city}, ${country}`);
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
        this.checkChanges();
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
            }
        })
    }

        getStyles(){
        const parentHeight = Component.publicStyles['#left-panel'].height;
        const fontSize = Math.round(parentHeight * 0.025);
        const lineHeight = fontSize + 5;
        const elementHeight = lineHeight + 10;
        const listItemMTop = fontSize * 0.833;
        const arrowHeight = fontSize/2;
        const listHeight = (lineHeight+listItemMTop)*5;

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
                    transition: 'height 0.7s, opacity 0.7s',
                    overflow: 'hidden',
                    height: '0',
                    opacity: '0',
                    transform: 'translateZ(0)',
                    willChange: 'height',
                    listStyle: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    structures: {
                        '.active': {
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
                            display: 'flex',
                            alignItems: 'center',
                            transition: 'color 0.7s',
                            marginTop: `${listItemMTop}px`,
                            position: 'relative',
                            overflow: 'visible',
                            pseudo: {
                                ':hover': {
                                    color: '#000000'
                                },
                                '::after':{
                                    content: "''",
                                    display: 'block',
                                    position: 'absolute',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    bottom: '0',
                                    background: '#000',
                                    width: '0',
                                    height: '1px',
                                    transition: 'width 0.3s'
                                },  
                                ':hover::after': {
                                    width: '100%'
                                },
                            }
                        },
                    }
                },
                ' .location__search': {
                    height: `${elementHeight}px`,
                    display: 'flex',
                    justifyContent: 'center',
                    structures: {
                        ' input': {
                            width: '90%',
                            border: '0.5px solid #e4e4e4ff',
                            borderRadius: '5px 0 0 5px',
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
                            border: '0.5px solid #e4e4e4ff',
                            borderRadius: '0 5px 5px 0',
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