
import Component from '../modules/component.js';

export default class ReturnLine extends Component{
    constructor(parent, elementType, selector){
        super(parent, elementType, selector);
        this.element = this.createElement();
        this.styles = this.getStyles();
        this.applyStyles();
        this.addListeners();
    }

    addListeners(){
        const element = this.element;
        element.addEventListener('click', () => {
            const content = [
                document.querySelector('#left-panel'),
                document.querySelector('#right-panel'),
                document.querySelector('#value-switch'),
                document.querySelector('.right-panel__container'),
                document.querySelector('.right-panel__more-container'),
                document.querySelector('#return')
            ]
            content.forEach(item => item.classList.remove('more'));
        })
    }

    getStyles(){
        const scale = Component.dataOperator.userData.scale;
        const width = 4 * scale;
        const height = 80 * scale;
        const borderRadius = 2 * scale;
        const right = 20 * scale;
        const hoveredWidth = width + 30;
        const animationDuration = '0.7s';

        const theme = Component.dataOperator.userData.theme;
        const background = theme === 'light' ? 'rgba(76,76,76,0.4)' : 'rgba(255,255,255,0.6)'
        return {
            width: `${width}px`,
            height: `${height}px`,
            borderRadius: `${borderRadius}px`,
            right: `${right}px`,
            background: background,
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'none',
            transition: `all ${animationDuration}`,
            pseudo: {
                ':hover': {
                    cursor: 'pointer',
                    width: `${hoveredWidth}px`,
                }
            },
            structures: {
                '.more': {
                    display: 'block',
                }
            }
        }
    }
}