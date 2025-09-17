
import Component from '../modules/component.js'

export default class ValueSwitch extends Component{

    constructor(parent, elementType, selector){
        super(parent, elementType, selector);
        this.element = this.createElement(`
            <div class="value-switch__cels">°C</div>
            <div class="value-switch__faren">°F</div>
        `);
        this.styles = this.getStyles();
        this.applyStyles();
        this.addListeners();
    }

    getStyles(){
        const scale = Component.dataOperator.userData.scale;
        const width = 120 * scale;
        const height = 45 * scale;
        const fontSize = 20 * scale;
        const right = 42 * scale;
        const top = 42 * scale;
        const borderRadius = 10 * scale;
        const animationDuration = '0.7s'
        
        const theme = Component.dataOperator.userData.theme;
        const color = theme === 'light' ? '#ffffff' : '#4c4c4c'
        const background = theme === 'light' ? '#4c4c4c' : '#ffffff'
        const borderColor = theme === 'light' ? 'rgba(76, 76, 76, 0.4)' : '#8c8c8c'
        return {
            zIndex: '1000',
            width: `${width}px`,
            height: `${height}px`,
            fontSize: `${fontSize}px`,
            right: `${right}px`,
            top: `${top}px`,
            background: background,
            color: color,
            borderRadius: `${borderRadius}px`,
            transition: `${animationDuration} all`,
            display: 'flex',
            alignItems: 'center',
            position: 'absolute',
            cursor: 'pointer',
            pseudo: {
                '::after': {
                    content: "''",
                    borderRadius: `${borderRadius}px`,
                    border: `1px solid ${borderColor}`,
                    transition: `${animationDuration} all`,
                    background: color,
                    position: 'absolute',
                    width: '50%',
                    height: '100%',
                    left: '0',
                    boxSizing: 'border-box',
                    zIndex: '0',
                },
            },
            structures: {
                '.more': {
                    left: `${right}px`,
                },
                ' .value-switch__cels': {
                    color: background,
                    transition: `${animationDuration} all`,
                    zIndex: '1',
                    width: '50%',
                    textAlign: 'center',
                },
                ' .value-switch__faren': {
                    transition: `${animationDuration} all`,
                    zIndex: '1',
                    width: '50%',
                    textAlign: 'center',
                    
                },
                '.active::after': {
                    left: '50%'
                },
                '.active': {
                    color: background,
                    structures: {
                        ' .value-switch__cels': {
                            color: color
                        }
                    }
                }
            },
            media: {
                'max-width: 1200px': {
                    width: '75px',
                    height: '35px',
                    fontSize: '15px',
                    top: '15px',
                    right: '18px',
                    borderRadius: '8px',
                    pseudo: {
                        '::after': {
                            borderRadius: '8px'
                        },
                    },
                },
                'max-width: 620px': {
                    position: 'fixed',
                    width: '60px',
                    height: '30px',
                    fontSize: '13px',
                    top: 'auto',
                    bottom: '20px',
                    right: '20px',
                }
            }

        }
    }

    addListeners(){
        this.element.addEventListener('click', (e) => {
            this.element.classList.toggle('active');
            if(this.element.classList.contains('active')){
                Component.dataOperator.unitChecker.unit = 'faren'
            }else{
                Component.dataOperator.unitChecker.unit = 'cels'
            }
            Component.dataOperator.dataIsReady();
        })
    }
}