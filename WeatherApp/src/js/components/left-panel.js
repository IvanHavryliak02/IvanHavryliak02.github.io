
import Component from "../modules/component.js";

export default class LeftPanel extends Component{
    constructor(parent, elementType, selector){
        super(parent, elementType, selector);
        this.element = this.createElement();
        this.styles = this.getStyles();
        this.applyStyles();
    }

    getStyles(){
        //const scale = Component.dataOperator.userData.scale;
        const parentWidth = Component.publicStyles['#app-body'].width;
        const parentHeight = Component.publicStyles['#app-body'].height;
        const parentBR = Component.publicStyles['#app-body'].borderRadius;
        const width = 447 / 1693 * parentWidth;
        const height = parentHeight;
        const widthPadding = 80 / 447 * width;
        const heightPadding = 50 / 960 * height;
        const borderRadius = parentBR;

        const theme = Component.dataOperator.userData.theme;
        const backgroundColor = theme === 'light' ? '#ffffff' : '#4A4A4A';
        const color = theme === 'light' ? '#4c4c4c' : '#ffffff';
        this.makeStylesPublic('#left-panel', {height:height, width: width});
        return {
            width: `${width}px`,
            height: `${height}px`,
            borderRadius: `${borderRadius}px 0 0 ${borderRadius}px`,
            background: backgroundColor,
            color: color,
            padding: `${heightPadding}px ${widthPadding}px`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            transition: 'transform 1s, border-radius 1s',
            structures: {
                '.more': {
                    transform: 'translateX(278.74%)',
                    borderRadius: `0 ${borderRadius}px ${borderRadius}px 0`,
                }
            },
            media: {
                '(max-width: 1200px)': {
                    width: '100%',
                    height: '100vh',
                    flexDirection: 'column',
                    borderRadius: '0',
                }
            }
        }
    }
}