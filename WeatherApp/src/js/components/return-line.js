
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
        const parentWidth = Component.publicStyles['#left-panel'].width;
        const parentHeight = Component.publicStyles['#left-panel'].height;
        const width = 4 / 447 * parentWidth;
        const height = 80 / 960 * parentHeight;
        const borderRadius = 2 / 4 * width;
        const right = 20 / 447 * parentWidth;
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
            pseudo: {
                ':hover': {
                    cursor: 'pointer'
                }
            },
            structures: {
                '.more': {
                    display: 'block'
                }
            }
        }
    }
}