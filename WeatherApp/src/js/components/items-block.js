
import Component from '../modules/component.js'
import userData from '../modules/user-data.js';

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
        const scale = userData.scale;

        const headerFZ = 40 * scale;
        const marginBottom = 50 * scale;
        const headerMB = 15 * scale;

        const theme = userData.theme;
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
                    textAlign: 'right',
                }
            },
            media: {
                'max-width: 1200px': {
                    structures: {
                        [` .${this.blockName}__header`]: {
                            fontSize: '26px',
                            marginBottom: '15px',
                        },
                        ' .conditions__container': {
                            justifyContent: 'space-between',
                        }
                    }
                },
                'max-width: 620px': {
                    structures: {
                        ' .conditions__container': {
                            flexDirection: 'column',
                            alignItems: 'center',
                        },
                        [` .${this.blockName}__header`]: {
                            fontSize: '20px',
                            textAlign: 'center'
                        }
                    }
                }
            }
        }
    }
}