
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
        return {
            width: '4px',
            height: '80px',
            borderRadius: '2px',
            position: 'absolute',
            background: '#4c4c4c',
            top: '50%',
            right: '20px',
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