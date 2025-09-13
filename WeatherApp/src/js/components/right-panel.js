
import Component from "../modules/component.js";

export default class RightPanel extends Component{
    constructor(parent, elementType, selector){
        super(parent, elementType, selector);
        this.element = this.createElement(`
            <div class="right-panel__container"></div>
            <div class="right-panel__more-container"></div>
        `);
        this.styles = this.getStyles();
        this.applyStyles();
    }

    getStyles(){
        const scale = Component.dataOperator.userData.scale;
        const width = 1246 * scale;
        const height = 960 * scale;
        const widthPadding = 45 * scale;
        const heightPadding = 50 * scale;
        this.makeStylesPublic('#right-panel', {width: width, height: height});
        return {
            width: `${width}px`,
            height: `${height}px`,
            padding: `${widthPadding}px ${heightPadding }px`,
            background: 'transparent',
            position: 'relative',
            float: 'right',
            transition: '0.7s all',
            structures: {
                ' .right-panel__more-container': {
                    display: 'none',
                    width: '100%',
                    height: '100%',
                    structures: {
                        '.more': {
                            display: 'block'
                        }
                    }
                },
                ' .right-panel__container': {
                    structures: {
                        '.more': {
                            display: 'none'
                        }
                    }
                },
                '.more': {
                    float: 'left',
                },
            },
        }
    }
}