
import Component from "../modules/component.js";
import userData from "../modules/user-data.js";

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
        
        const theme = userData.theme;
        const background = theme === 'light' ? '#dddddd' : '#313131';
        return {
            width: `${width}px`,
            height: `${height}px`,
            display: `flex`,
            justifyContent: `center`,
            alignItems: `center`,
            background: background,
            media: {
                'max-width: 1200px': {
                    width: '100vw',
                    height: 'auto',
                    display: 'block',
                }
            }
        }
    }
}