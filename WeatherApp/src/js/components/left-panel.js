
import Component from "../modules/component.js";

export default class LeftPanel extends Component{
    constructor(parent){
        super(parent, 'div', 'left-panel');
        this.element = this.createElement();
        this.styles = this.getStyles();
        this.applyStyles();
    }

    getStyles(){
        const width = Math.round(this.parent.offsetWidth * 0.264);
        const height = Math.round(this.parent.offsetHeight * 1);
        return {
            width: `${width}px`,
            height: `${height}px`,
            borderRadius: '70px 0 0 70px',
            background: '#fff',
            padding: '48px 0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }
    }
}