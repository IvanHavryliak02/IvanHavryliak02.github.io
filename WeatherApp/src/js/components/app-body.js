
import Component from "../modules/component.js";


export default class AppBody extends Component{
    constructor(parent, elementType, selector){
        super(parent, elementType, selector);
        this.element = this.createElement();
        this.styles = this.getStyles();
        this.applyStyles();
    }

    getStyles(){
        const width = Math.round(this.parent.offsetWidth * 0.88);
        const height = Math.round(this.parent.offsetHeight * 0.88);
        this.makeStylesPublic(this.elementSelector, {width:width, height:height});
        return {
            display: 'flex',
            width: `${width}px`,
            height: `${height}px`,
            background: '#efefef',
            borderRadius: `70px`,
            justifyContent: 'space-between',
            media: {
                '(max-width: 576px)': {
                    width: '100%',
                    height: "auto",
                    flexDirection: 'column',
                    borderRadius: '0',
                }
            }
        }
    }
}