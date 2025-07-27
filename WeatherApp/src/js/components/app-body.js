
import Component from "../modules/component.js";


export default class AppBody extends Component{
    constructor(parent){
        super(parent, 'div', 'app-body');
        this.element = this.createElement();
        this.styles = this.getStyles();
        this.applyStyles();
    }

    getStyles(){
        const width = Math.round(this.parent.offsetWidth * 0.88);
        const height = Math.round(this.parent.offsetHeight * 0.88);
        return {
            display: 'flex',
            width: `${width}px`,
            height: `${height}px`,
            background: '#efefef',
            borderRadius: `70px`
        }
    }
}