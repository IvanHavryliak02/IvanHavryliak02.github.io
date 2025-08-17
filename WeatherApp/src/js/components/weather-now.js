
import Component from '../modules/component.js';

export default class WeatherNow extends Component{
    constructor(parent, elementType, selector){
        super(parent, elementType, selector);
        this.element = this.createElement(`
            <div class="now__weather-wrap">
                <img class="now__weather-type" alt="weather now">
            </div>
            <span class="now__temp"></span>
            <div class="now__wrap">
                <img class="now__status" alt="status now">
                <span class="now__descr"></span>
            </div>
        `)
        this.styles = this.getStyles();
        this.applyStyles();
        Component.dataOperator.subscribe(this.fillData)
    }

    fillData = async () => {
        const weatherDescr = {
            'cloud.svg': 'Cloudy',
            'drizzle.svg': 'Drizzly',
            'fog.svg': 'Foggy',
            'hot.svg': 'Sunny',
            'lightning.svg': 'Lightning',
            'part-cloud.svg': 'Partly cloudy',
            'rain-cloud.svg': 'Rainy',
            'snow.svg': 'Snowy',
            'storm.svg': 'Stormy',
            'sun.svg': 'Sunny',
            'tornado.svg': 'Tornado',
            'haze.svg': 'Hazy'
        }
        try{
            const data = Component.dataOperator.weatherData;
            const hour = new Date().getHours();
            const code = data.hourly.weather_code[hour];
            const temp = Math.round(data.hourly.temperature_2m[hour]);
            const tempUnit = '°C'  
            const weatherImage = Component.dataOperator.weatherDecoder.whatsImage(code, temp);
            const src = `./icons/lightTheme/ico-${weatherImage}`;
            this.element.querySelector('.now__weather-type').src = src;
            this.element.querySelector('.now__temp').textContent = `${temp} ${tempUnit}`;
            this.element.querySelector('.now__status').src = src;
            this.element.querySelector('.now__descr').textContent = weatherDescr[weatherImage]
        }catch(err){
            console.error(`${this.element} can't find his data:`,err.message)
        }
    }

    getStyles(){
        const parentHeight = Component.publicStyles['#left-panel'].height;
        const marginTop = 90/960 * parentHeight;
        const width = 256/960 * parentHeight;
        const tempFZ = 96/960 * parentHeight;
        const tempMB = 82/960 * parentHeight;
        const wrapHeight = 32/960 * parentHeight;
        const descrFZ = 20/960 * parentHeight;
        return{
            marginTop: `${marginTop}px`,
            width: `${width}px`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            structures: {
                ' .now__weather-wrap': {
                    width: '100%',
                    marginBottom: `${marginTop}px`,
                    height: `${width}px`,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    structures: {
                        ' .now__weather-type': {
                            width: '100%'
                        },
                    }
                },
                ' .now__temp': {
                    fontSize: `${tempFZ}px`,
                    marginBottom: `${tempMB}px`,
                },
                ' .now__wrap': {
                    height: `${wrapHeight}px`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    structures: {
                        ' .now__status': {
                            width: `${wrapHeight}px`,
                            fontSize: `${descrFZ}px`,
                            marginRight: '10px',
                        },
                        ' .now__descr': {
                            fontSize: `${descrFZ}px`
                        }
                    } 
                }
            }
        }
    }
}