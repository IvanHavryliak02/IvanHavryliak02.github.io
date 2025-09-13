
import Component from '../modules/component.js'

export default class ItemsBlock extends Component{
    constructor(parent, elementType, selector, headerContent){
        super(parent, elementType, selector);
        this.blockName = Array.isArray(selector) ? selector[0] : selector;
        this.blockName = this.blockName.slice(1)
        this.element = this.createElement(`
            <h2 class="${this.blockName}__header">
                ${headerContent}
            </h2>
            <div class="${this.blockName}__container"></div>
        `)
        this.styles = this.getStyles();
        this.applyStyles();
    }

    getStyles(){
        const parentHeight = Component.publicStyles['#right-panel'].height;
        const headerFZ = 40 / 960 * parentHeight;
        const marginBottom = 47 / 960 * parentHeight;
        const headerMB = 15 / 960 * parentHeight;

        const theme = Component.dataOperator.userData.theme;
        const headerColor = theme === 'light' ? '#4C4C4C' : '#ffffff';
        return {
            marginBottom: `${marginBottom }px`,
            structures: {
                [` .${this.blockName}__header`]: {
                    color: headerColor,
                    fontSize: `${headerFZ}px`,
                    marginBottom: `${headerMB}px`,
                    fontWeight: '400',
                    userSelect: 'none',
                },
                [` .${this.blockName}__container`]: {
                    display: 'flex',
                },
                ' .hourly__container': {
                    width: '100%'
                },
                ' .daily__container': {
                    width: '100%'
                },
                '.trend_modif': {
                    structures: {
                        [` .hourly-trend__header, .daily-trend__header`]: {
                            textAlign: 'right'
                        },
                    }
                }
            }
        }
    }
}