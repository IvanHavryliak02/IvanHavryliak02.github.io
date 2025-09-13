
import Component from "../modules/component.js";


export default class AppBody extends Component{
    constructor(parent, elementType, selector){
        super(parent, elementType, selector);
        this.element = this.createElement();
        this.styles = this.getStyles();
        this.applyStyles();
    }

    getStyles(){
        const parentWidth = Component.publicStyles['.container'].width;
        const parentHeight = Component.publicStyles['.container'].height;
        const width = 1693 / 1920 * parentWidth;
        const height = 960 / 1080 * parentHeight;
        const borderRadius = 70 / 960 * parentHeight;
        this.makeStylesPublic(this.elementSelector, {width:width, height:height});
        const theme = Component.dataOperator.userData.theme;
        const backgroundColor = theme === 'light' ? '#efefef' : '#3A3A3A'
        return {
            //display: 'flex',
            width: `${width}px`,
            height: `${height}px`,
            background: backgroundColor,
            borderRadius: `${borderRadius}px`,
            //justifyContent: 'space-between',
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