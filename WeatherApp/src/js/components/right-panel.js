
import Component from "../modules/component.js";

export default class RightPanel extends Component{
    constructor(parent, elementType, selector){
        super(parent, elementType, selector);
        this.element = this.createElement(`
            <div class="right-panel__container more"></div>
        `);
        this.styles = this.getStyles();
        this.applyStyles();
    }

    getStyles(){
        const width = Math.round(Component.publicStyles['#app-body'].width * (1 - 0.264));
        const height = Math.round(Component.publicStyles['#app-body'].height * 1);
        this.makeStylesPublic('#right-panel', {width: width, height: height});
        return {
            width: `${width}px`,
            height: `${height}px`,
            padding: '46px 50px',
            background: 'transparent',
            position: 'relative',
            float: 'right',
            transition: '0.7s all',
            structures: {
                '.more': {
                    float: 'left',
                },
                ' .right-panel__container': {
                    structures: {
                        '.more': {
                            display: 'none'
                        }
                    }
                }
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