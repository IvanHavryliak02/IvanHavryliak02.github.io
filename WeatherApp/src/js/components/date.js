
import Component from "../modules/component.js";

export default class currentDate extends Component{

    static months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]

    constructor(parent, elementType, selector){
        super(parent, elementType, selector);
        this.element = this.createElement(`
            <span class="icon-calendar"></span>
            <span class="date__month-day"></span>  
        `);
        this.fillData();
        this.styles = this.getStyles();
        this.applyStyles();
    }

    getStyles(){
        const parentHeight = Component.publicStyles['#left-panel'].height;
        const parentWidth = Component.publicStyles['#left-panel'].width;
        const fontSize = parentHeight * 0.025;
        const lineHeight = fontSize + 5;
        const marginTop = parentHeight * 0.0344;
        const monthDayMLeft = parentWidth * 0.018
        return {
            fontSize: `${fontSize}px`,
            lineHeight: `${lineHeight}px`,
            marginTop: `${marginTop}px`,
            display: 'flex',
            alignItems: 'center',
            structures: {
                ' .date__month-day': {
                    marginLeft: `${monthDayMLeft}px`
                },
            },
        }
    }

    fillData(){
        const element = this.element;
        const now = new Date();
        const currMonth = currentDate.months[now.getMonth()];
        const currDay = now.getDate();

        element.querySelector('.date__month-day').textContent = `${currMonth} ${currDay}`;
    }
}