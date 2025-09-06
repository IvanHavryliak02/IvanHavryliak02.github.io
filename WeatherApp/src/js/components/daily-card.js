
import Component from '../modules/component.js'

export default class DailyCard extends Component{
    constructor(parent, elementType, selector, i){
        super(parent, elementType, selector)
        this.element = this.createElement(`
            <span class='daily-card__day'></span>
            <img alt="daily weather status" class='daily-card__status'>
            <div class="daily-card__wrap">
                <span class="daily-card__max-temp"></span> 
                <span class="daily-card__min-temp"></span>  
            </div>
        `)
        this.styles = this.getStyles();
        this.applyStyles();
        Component.dataOperator.subscribe(() => {this.fillData(i)})
    }

    fillData = async(i) => {
        try{
            const dayBlock = this.element.querySelector('.daily-card__day');
            const imgBlock = this.element.querySelector('.daily-card__status');
            const maxTempBlock = this.element.querySelector('.daily-card__max-temp');
            const minTempBlock = this.element.querySelector('.daily-card__min-temp');

            const data = Component.dataOperator.weatherData;
            const dataOperator = Component.dataOperator;

            const todayNumber = dataOperator.userTime.weekday;
            let dayNumber = i + todayNumber;
            if(dayNumber > 6){
                dayNumber = dayNumber - 7;
            }

            const weatherCode = data.daily.weather_code[dayNumber];
            let maxTemp = data.daily.temperature_2m_max[i];
            let minTemp = data.daily.temperature_2m_min[i];
            const imgType = dataOperator.weatherDecoder.whatsImage(weatherCode, maxTemp);
            const dayName = dataOperator.userTime.findWeekday(dayNumber)
            maxTemp = dataOperator.unitChecker.calculateTemp(maxTemp)
            minTemp = dataOperator.unitChecker.calculateTemp(minTemp)

            dayBlock.textContent = dayName.slice(0, 3).toUpperCase();
            imgBlock.src = `icons/lightTheme/ico-${imgType}`;
            maxTempBlock.textContent = `${Math.round(maxTemp)}°`;
            minTempBlock.textContent = `${Math.round(minTemp)}°`;

        }catch(err){
            console.error(`Element ${this.elementSelector} can't find his data: `, err.message);
        }
    }

    getStyles(){
        const parentWidth = Component.publicStyles['#right-panel'].width;
        const parentHeight = Component.publicStyles['#right-panel'].height;
        const width = 144/1246 * parentWidth;
        const height = 206/960 * parentHeight;
        const imgWidth = 60/144 * width;
        const wrapWidth = 73/144 * width;
        const wrapFZ = 18/206 * height;
        const wrapLH = wrapFZ + 4;
        const dayFZ = 22/206 * height;
        const dayLH = dayFZ + 5;
        return {
            width: `${width}px`,
            height: `${height}px`,
            borderRadius: '10px',
            background: '#ffffff',
            marginRight: '22px',
            flexShrink: '0',
            padding: '12px',
            color: '#4c4c4c',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            pseudo: {
                ':last-child': {
                    marginRight: '0'
                }
            },
            structures: {
                ' .daily-card__status': {
                    width: `${imgWidth}px`,
                    height: `${imgWidth}px`,
                },
                ' .daily-card__wrap': {
                    minWidth: `${wrapWidth}px`,
                    fontSize: `${wrapFZ}px`,
                    lineHeight: `${wrapLH}px`,
                    display: 'flex',
                    justifyContent: 'space-between'
                },
                ' .daily-card__day': {
                    fontSize: `${dayFZ}px`,
                    lineHeight: `${dayLH}px`,
                }
            }
        }
    }

}