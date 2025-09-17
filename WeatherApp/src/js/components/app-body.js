
import Component from "../modules/component.js";


export default class AppBody extends Component{
    constructor(parent, elementType, selector){
        super(parent, elementType, selector);
        this.element = this.createElement();
        this.styles = this.getStyles();
        this.applyStyles();
    }

    getStyles(){
        const scale = Component.dataOperator.userData.scale;
        const width = 1693 * scale;
        const height = 960 * scale;
        const borderRadius = 70 * scale;
        this.makeStylesPublic(this.elementSelector, {width:width, height:height, borderRadius: borderRadius});

        const theme = Component.dataOperator.userData.theme;
        const backgroundColor = theme === 'light' ? '#efefef' : '#3A3A3A'
        return {
            width: `${width}px`,
            height: `${height}px`,
            background: backgroundColor,
            borderRadius: `${borderRadius}px`,
            position: 'relative',
            display: 'flex',
            media: {
                'max-width: 1200px': {
                    width: '100%',
                    height: "auto",
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderRadius: '0',
                }
            }
        }
    }
}