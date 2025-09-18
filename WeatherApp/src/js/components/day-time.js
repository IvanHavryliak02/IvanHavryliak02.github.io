
import Component from '../modules/component.js'
import userData from '../modules/user-data.js';

export default class DayAndTime extends Component{
    constructor(parent, elementType, selector){
        super(parent, elementType, selector);
        this.element = this.createElement(`
            <span class="today__day"></span>
            <span class="today__time"></span>
        `);
        this.weekday = userData.findWeekday();
        this.fillData(this.weekday);
        this.styles = this.getStyles();
        this.applyStyles();
    }

    fillData(weekday){
        this.element.querySelector('.today__day').textContent = `${weekday},`;
        this.element.querySelector('.today__time').textContent = `${userData.hour}:00`;
    }

    getStyles(){
        const scale = userData.scale;
        const fontSize = 40 * scale;
        const marginBottom = 25 * scale;
        const lineHeight = fontSize + 8 * scale;
        return {
            fontSize: `${fontSize}px`,
            lineHeight: `${lineHeight}px`,
            marginBottom: `${marginBottom}px`,
            media: {
                'max-width: 1200px': {
                    fontSize: '36px',
                    marginBottom: `35px`,
                    lineHeight: '39px',
                },
                'max-width: 620px': {
                    fontSize: '28px',
                    marginBottom: '26px'
                }
            }
        };
    }
}