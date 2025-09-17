
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
        const scale = Component.dataOperator.userData.scale;

        const fontSize = 24 * scale;
        const lineHeight = fontSize + 5 * scale;
        const marginTop = 33 * scale;
        const monthDayMLeft = 8 * scale;
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
            media: {
                'max-width: 1200px': {
                    fontSize: '20px',
                    lineHeight: '24px',
                    marginTop: '20px',
                    structures: {
                        ' .date__month-day': {
                            marginLeft: `10px`
                        },
                    }
                }
            }
        }
    }

   
}