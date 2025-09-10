
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
        const headerFZ = 40/960 * parentHeight;
        const mBott = 45/960 * parentHeight;
        const containerWidth = 933/960 * parentHeight
        return {
            marginBottom: `${mBott}px`,
            structures: {
                [` .${this.blockName}__header`]: {
                    color: '#4C4C4C',
                    fontSize: `${headerFZ}px`,
                    marginBottom: '15px',
                    fontWeight: '400',
                    userSelect: 'none',
                },
                [` .${this.blockName}__container`]: {
                    display: 'flex',
                    justifyContent: 'space-between',
                   
                },
                '.conditions_modif': {
                    maxWidth: `${containerWidth}px`
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