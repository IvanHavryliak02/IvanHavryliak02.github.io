
import Component from '../modules/component.js'

export default class HourlyCard extends Component{
    constructor(parent, elementType, selector, i){
        super(parent, elementType, selector);
        this.element = this.createElement(`
            <span class='hourly-card__time'></span>
            <img alt="weather status" class='hourly-card__status'>
            <span class="hourly-card__temp"></span>   
        `)
        this.styles = this.getStyles();
        this.applyStyles();
        Component.dataOperator.subscribe(() => this.fillData(i));
    }


    fillData = async(i) => {
        
        try{
            const timeBlock = this.element.querySelector('.hourly-card__time');
            const statusBlock = this.element.querySelector('.hourly-card__status');
            const tempBlock = this.element.querySelector('.hourly-card__temp');

            const data = Component.dataOperator.weatherData;
            const weatherTime = data.hourly.time[i].match(/\d{2}:\d{2}$/)[0];
            const code = data.hourly.weather_code[i];
            let temp = data.hourly.temperature_2m[i];
            const theme = Component.dataOperator.userData.theme;
            const srcImg = Component.dataOperator.weatherDecoder.whatsImage(code,temp);
            const srcFolder = theme === 'light' ? 'lightTheme' : 'darkTheme';
            temp = Math.round(Component.dataOperator.unitChecker.calculateTemp(temp));

            timeBlock.textContent = weatherTime;
            statusBlock.src = `icons/${srcFolder}/ico-${srcImg}`;
            tempBlock.textContent = `${temp}°`   
        }catch(err){
            console.error(`${this.elementSelector} can't find his data:`,err.message)
        }
    }


    getStyles(){
        const parentWidth = Component.publicStyles['#right-panel'].width;
        const parentHeight = Component.publicStyles['#right-panel'].height;
        const width = 144/1246 * parentWidth;
        const height = 206/960 * parentHeight;
        const imgWidth = 60/144 * width;
        const tempFZ = 18/206 * height;
        const tempLH = tempFZ + 4;
        const timeFZ = 22/206 * height;
        const timeLH = timeFZ + 5;

        const theme = Component.dataOperator.userData.theme
        const background = theme === 'light' ? '#ffffff' : '#5e5e5e'
        const color = theme === 'light' ? '#4c4c4c' : '#ffffff';


        return {
            width: `${width}px`,
            height: `${height}px`,
            borderRadius: '10px',
            background: background ,
            marginRight: '22px',
            flexShrink: '0',
            padding: '12px',
            color: color,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            structures: {
                ' .hourly-card__status': {
                    width: `${imgWidth}px`,
                    height: `${imgWidth}px`,
                },
                ' .hourly-card__time': {
                    fontSize: `${timeFZ}px`,
                    lineHeight: `${timeLH}px`
                },
                ' .hourly-card__temp': {
                    fontSize: `${tempFZ}px`,
                    lineHeight: `${tempLH}px`
                },

            }
        }
    }
}