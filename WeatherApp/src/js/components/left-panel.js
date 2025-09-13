
import Component from "../modules/component.js";

export default class LeftPanel extends Component{
    constructor(parent, elementType, selector){
        super(parent, elementType, selector);
        this.element = this.createElement();
        this.styles = this.getStyles();
        this.applyStyles();
    }

    getStyles(){
        const parentWidth = Component.publicStyles['#app-body'].width;
        const parentHeight = Component.publicStyles['#app-body'].height;
        const width = 447 / 1693 * parentWidth;
        const height = 960 / 960 * parentHeight;
        const heightPadding = 50 / 960 * height;
        const theme = Component.dataOperator.userData.theme;

        const borderRadius = 70 / 960 * parentHeight;
        const backgroundColor = theme === 'light' ? '#ffffff' : '#4A4A4A';
        const color = theme === 'light' ? '#4c4c4c' : '#ffffff';
        this.makeStylesPublic('#left-panel', {height:height, width: width});
        return {
            width: `${width}px`,
            height: `${height}px`,
            borderRadius: `${borderRadius}px 0 0 ${borderRadius}px`,
            background: backgroundColor,
            color: color,
            float: 'left',
            padding: `${heightPadding}px 0`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            structures: {
                '.more': {
                    float: 'right',
                    borderRadius: `0 ${borderRadius}px ${borderRadius}px 0`,
                }
            },
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