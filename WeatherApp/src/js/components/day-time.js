
import Component from '../modules/component.js'

export default class DayAndTime extends Component{
    constructor(parent, elementType, selector){
        super(parent, elementType, selector);
        this.element = this.createElement(`
            <span class="today__day"></span>
            <span class="today__time"></span>
        `);
        this.date = this.readCurrDate();
        this.fillData();
        this.styles = this.getStyles();
        this.applyStyles();
    }

    readCurrDate(){
        const now = new Date(),
              days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
              day = days[now.getDay()];
        return {
            hour: now.getHours(),
            day: day
        }
    }

    getStyles(){
        const parentHeight = Component.publicStyles['#left-panel'].height
        const fontSize = Math.round(parentHeight * 0.042);
        const marginBottom = Math.round(parentHeight * 0.027);
        const lineHeight = Math.round(fontSize + 8);
        return {
            fontSize: `${fontSize}px`,
            lineHeight: `${lineHeight}px`,
            marginBottom: `${marginBottom}px`
        };
    }

    fillData(){
        this.element.querySelector('.today__day').textContent = `${this.date.day},`;
        this.element.querySelector('.today__time').textContent = `${this.date.hour}:00`;
    }
}