
import Component from '../modules/component.js'

export default class DayAndTime extends Component{
    constructor(parent, elementType, selector){
        super(parent, elementType, selector);
        this.element = this.createElement(`
            <span class="today__day"></span>
            <span class="today__time"></span>
        `);
        this.weekday = Component.dataOperator.userTime.findWeekday();
        this.fillData(this.weekday);
        this.styles = this.getStyles();
        this.applyStyles();
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

    fillData(weekday){
        this.element.querySelector('.today__day').textContent = `${weekday},`;
        this.element.querySelector('.today__time').textContent = `${Component.dataOperator.userTime.hour}:00`;
    }
}