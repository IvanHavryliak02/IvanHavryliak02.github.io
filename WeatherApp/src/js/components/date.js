
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

    fillData(){
        const element = this.element;
        const currMonth = currentDate.months[Component.dataOperator.userData.month];
        const currDay = Component.dataOperator.userData.date;

        element.querySelector('.date__month-day').textContent = `${currMonth} ${currDay}`;
    }

    getStyles(){
        const parentHeight = Component.publicStyles['#left-panel'].height;
        const parentWidth = Component.publicStyles['#left-panel'].width;
        const fontSize = 24 / 960 * parentHeight;
        const lineHeight = fontSize + 5;
        const marginTop = 33 / 960 * parentHeight;
        const monthDayMLeft = 8 / 447 * parentWidth
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

   
}