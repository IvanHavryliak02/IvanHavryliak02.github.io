
import Component from '../modules/component.js';
import unitChecker from '../modules/unit-checker.js';
import userData from '../modules/user-data.js';
import weatherDecoder from '../modules/weather-decoder.js';

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

            const data = Component.dataOperator.APIData;
            const dataOperator = Component.dataOperator;

            const todayNumber = userData.weekday;
            let dayNumber = i + todayNumber;
            if(dayNumber > 6){
                dayNumber -= 7;
            }

            const weatherCode = data.daily.weather_code[dayNumber];
            let maxTemp = data.daily.temperature_2m_max[i];
            let minTemp = data.daily.temperature_2m_min[i];
            
            const imgType = weatherDecoder.whatsImage(weatherCode, maxTemp);

            const dayName = userData.findWeekday(dayNumber)
            maxTemp = unitChecker.calculateTemp(maxTemp)
            minTemp = unitChecker.calculateTemp(minTemp)

            dayBlock.textContent = dayName.slice(0, 3).toUpperCase();
            const theme = userData.theme;
            const srcFolder = theme === 'light' ? 'lightTheme' : 'darkTheme';
            imgBlock.src = `icons/${srcFolder}/ico-${imgType}`;
            maxTempBlock.textContent = `${Math.round(maxTemp)}°`;
            minTempBlock.textContent = `${Math.round(minTemp)}°`;

        }catch(err){
            console.error(`Element ${this.elementSelector} can't find his data: `, err.message);
        }
    }

    getStyles(){
        const scale = userData.scale;

        const width = 144 * scale;
        const height = 206 * scale;
        const borderRadius = 10 * scale;
        const marginRight = 22 * scale;
        const padding = 12 * scale;

        const imgWidth = 60 * scale;
        const wrapWidth = 73 * scale;
        const wrapFZ = 18 * scale;
        const wrapLH = wrapFZ + 4 * scale;
        
        const dayFZ = 22 * scale;
        const dayLH = dayFZ + 5 * scale;
        

        const theme = userData.theme
        const background = theme === 'light' ? '#ffffff' : '#5e5e5e'
        const color = theme === 'light' ? '#4c4c4c' : '#ffffff'
        return {
            width: `${width}px`,
            height: `${height}px`,
            borderRadius: `${borderRadius}px`,
            background: background,
            marginRight: `${marginRight}px`,
            flexShrink: '0',
            padding: `${padding}px`,
            color: color,
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
            },
            media: {
                'max-width: 1200px': {
                    width: '110px',
                    height: '150px',
                    padding: '15px',
                    borderRadius: '7px',
                     marginRight: '20px',
                    structures: {
                        ' .daily-card__day': {
                            fontSize: '17px'
                        },
                        ' .daily-card__status': {
                            width: '50px',
                            height: '50px'
                        },
                        ' .daily-card__wrap': {
                            fontSize: '17px',
                            minWidth: '60px'
                        }
                    }
                }
            }
        }
    }

}