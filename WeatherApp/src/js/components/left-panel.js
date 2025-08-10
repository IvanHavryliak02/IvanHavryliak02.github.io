
import Component from "../modules/component.js";

export default class LeftPanel extends Component{
    constructor(parent, elementType, selector){
        super(parent, elementType, selector);
        this.element = this.createElement();
        this.styles = this.getStyles();
        this.applyStyles();
    }

    getStyles(){
        const width = Math.round(Component.publicStyles['#app-body'].width * 0.264);
        const height = Math.round(Component.publicStyles['#app-body'].height * 1);
        this.makeStylesPublic(this.elementSelector, {height:height, width: width});
        return {
            width: `${width}px`,
            height: `${height}px`,
            borderRadius: '70px 0 0 70px',
            background: '#fff',
            padding: '48px 0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: '#4c4c4c',
            media: {
                '(max-width: 576px)': {
                    width: '100%',
                    height: '100vh',
                    borderRadius: '0',
                    padding: '10px 0 0 0'
                }
            }
        }
    }
}