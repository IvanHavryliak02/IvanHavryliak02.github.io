
import Component from "../modules/component.js";

export default class LeftPanel extends Component{
    constructor(parent, elementType, selector){
        super(parent, elementType, selector);
        this.element = this.createElement();
        this.styles = this.getStyles();
        this.applyStyles();
    }

    getStyles(){
        const scale = Component.dataOperator.userData.scale;
        const width = 447 * scale;
        const height = 960 * scale;
        const padding = 50 * scale;
        const borderRadius = 70 * scale;

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
            padding: `${padding}px`,
            float: 'left',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            structures: {
                '.more': {
                    float: 'right',
                    borderRadius: `0 ${borderRadius}px ${borderRadius}px 0`,
                }
            }
        }
    }
}