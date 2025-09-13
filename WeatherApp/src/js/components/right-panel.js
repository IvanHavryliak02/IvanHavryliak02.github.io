
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
        const parentWidth = Component.publicStyles['#app-body'].width
        const parentHeight = Component.publicStyles['#app-body'].height
        const width = 1246 / 1693 * parentWidth;
        const height = 960 / 960 * parentHeight;
        const widthPadding = 45 / 1246 * width;
        const heightPadding = 50 / 960 * height;
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
            media: {
                '(max-width: 576px)': {
                    width: '100%',
                    height: 'auto',
                    padding: '0'
                }
            }
        }
    }
}