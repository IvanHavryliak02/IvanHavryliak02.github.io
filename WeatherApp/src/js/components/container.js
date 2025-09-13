
import Component from "../modules/component.js";

export default class Container extends Component{
    constructor(parent, elementType, selector){
        super(parent, elementType, selector);
        this.element = this.createElement();
        this.styles = this.getStyles();
        this.applyStyles();
    }

    getStyles(){
        const width = window.innerWidth;
        const height = window.innerHeight;
        this.makeStylesPublic(this.elementSelector, {width: width, height: height});
        const theme = Component.dataOperator.userData.theme;
        const background = theme === 'light' ? '#dddddd' : '#313131';
        return {
            width: `${width}px`,
            height: `${height}px`,
            display: `flex`,
            justifyContent: `center`,
            alignItems: `center`,
            background: background,
        }
    }
}