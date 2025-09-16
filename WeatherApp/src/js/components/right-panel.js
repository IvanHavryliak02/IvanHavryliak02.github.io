
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
            background: 'transparent',
            position: 'relative',
            transition: 'transform 1s',
            structures: {
                ' .right-panel__more-container': {
                    padding: `${widthPadding}px ${heightPadding }px`,
                    position: 'absolute',
                    inset: '0',
                    opacity: '0',
                    width: '100%',
                    height: '100%',
                    transition: 'opacity 1s',
                    zIndex: '1',
                    structures: {
                        '.more': {
                            opacity: '1',
                            zIndex: '2',
                        }
                    },
                },
                ' .right-panel__container': {
                    padding: `${widthPadding}px ${heightPadding }px`,
                    position: 'absolute',
                    inset: '0',
                    opacity: '1',
                    transition: 'opacity 1s',
                    zIndex: '2',
                    structures: {
                        '.more': {
                            opacity: '0',
                            zIndex: '1',
                        }
                    }
                },
                '.more': {
                    transform: 'translateX(-35.87%)',
                },
            },
        }
    }
}