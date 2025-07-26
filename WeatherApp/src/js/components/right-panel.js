
import Component from "../modules/component.js";

export default class RightPanel extends Component{
    constructor(parent){
        super(parent,'div','right-panel');
        this.element = this.createElement();
        this.styles = this.getStyles();
        this.applyStyles();
    }

    getStyles(){
        const width = Math.round(this.parent.offsetWidth * (1 - 0.264));
        const height = Math.round(this.parent.offsetheight * 1);
        return {
            width: width,
            height: height,
            padding: '46px 50px'
        }
    }
}