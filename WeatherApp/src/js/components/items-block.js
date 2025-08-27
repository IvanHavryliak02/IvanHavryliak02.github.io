
import Component from '../modules/component.js'

export default class ItemsBlock extends Component{
    constructor(parent, elementType, selector, headerContent){
        super(parent, elementType, selector);
        this.blockName = selector.slice(1);
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
        const mBott = 47/960 * parentHeight;
        const containerWidth = 933/960 * parentHeight
        return {
            marginBottom: `${mBott}px`,
            structures: {
                [` .${this.blockName}__header`]: {
                    color: '#4C4C4C',
                    fontSize: `${headerFZ}px`,
                    marginBottom: '24px',
                    fontWeight: '400'
                },
                [` .${this.blockName}__container`]: {
                    display: 'flex',
                    justifyContent: 'space-between',
                    maxWidth: `${containerWidth}px`
                },
                [` .hourly__container`]: {
                    width: '100%'
                }
            }
        }
    }
}