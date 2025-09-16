
import Component from '../modules/component.js';

export default class ReturnButton extends Component{
    constructor(parent, elementType, selector){
        super(parent, elementType, selector);
        this.element = this.createElement('back');
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

        const fontSize = 32 * scale;
        const borderRadius = 2 * scale;
        const animationDuration = '0.7s';

        const theme = Component.dataOperator.userData.theme;
        const color = theme === 'light' ? 'rgba(76,76,76,0.4)' : 'rgba(255,255,255,0.6)'
        const hoverColor = theme === 'light' ? '#000' : '#fff'
        return {
            fontSize: `${fontSize}px`,
            borderRadius: `${borderRadius}px`,
            color: color,
            textTransform: 'uppercase',
            right: `0`,
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%) rotate(-90deg)',
            display: 'none',
            transition: `all ${animationDuration}`,
            pseudo: {
                ':hover': {
                    cursor: 'pointer',
                    color: hoverColor,
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