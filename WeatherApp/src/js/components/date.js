
import Component from '../modules/component.js'

export default class Day extends Component{
    constructor(parent){
        super(parent, 'span', 'today');
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
        const fontSize = Math.round(this.parent.offsetHeight * 0.042);
        const lineHeight = Math.round(fontSize + 8);
        const marginBottom = Math.round(this.parent.offsetHeight * 0.027)
        return {
            fontSize: fontSize,
            lineHeight: lineHeight,
            marginBottom: marginBottom
        };
    }

    fillData(){
        this.element.querySelector('.today__day').textContent = `${this.date.day},`;
        this.element.querySelector('.today__time').textContent = `${this.date.hour}:00`;
    }
}