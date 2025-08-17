
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
        const headerFZ = 40/960 * Component.publicStyles['#right-panel'].height;
        const mBott = 47/960 * Component.publicStyles['#right-panel'].height;
        return {
            marginBottom: `${mBott}px`,
            structures: {
                [` .${this.blockName}__header`]: {
                    color: '#4C4C4C',
                    fontSize: `${headerFZ}px`,
                    marginBottom: '24px',
                    fontWeight: '400'
                }
            }
        }
    }
}