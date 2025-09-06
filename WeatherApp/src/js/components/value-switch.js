
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
        const parentHeight = Component.publicStyles['#right-panel'].height;
        const parentWidth = Component.publicStyles['#right-panel'].width;
        const width = 120/1245 * parentWidth;
        const height = 45/960 * parentHeight;
        const fontSize = 20/45 * height;
        const right = 42/1245 * parentWidth;
        const top = 42/960 * parentHeight;
        const animationDuration = '0.7s'
        return {
            width: `${width}px`,
            height: `${height}px`,
            display: 'flex',
            alignItems: 'center',
            color: '#ffffff',
            fontSize: `${fontSize}px`,
            position: 'absolute',
            right: `${right}px`,
            top: `${top}px`,
            borderRadius: '10px',
            background: '#4c4c4c',
            cursor: 'pointer',
            transition: '0.7s all',
            pseudo: {
                '::after': {
                    content: "''",
                    position: 'absolute',
                    width: '50%',
                    height: '100%',
                    borderRadius: '10px',
                    border: '1px solid rgba(76, 76, 76, 0.4)',
                    background: '#fff',
                    left: '0',
                    boxSizing: 'border-box',
                    zIndex: '0',
                    transition: `${animationDuration} all`
                },
            },
            structures: {
                '.more': {
                    left: `${right}px`,
                },
                ' .value-switch__cels': {
                    zIndex: '1',
                    width: '50%',
                    textAlign: 'center',
                    color: '#4c4c4c',
                    transition: `${animationDuration} all`
                },
                ' .value-switch__faren': {
                    zIndex: '1',
                    width: '50%',
                    textAlign: 'center',
                    transition: `${animationDuration} all`
                },
                '.active::after': {
                    left: '50%'
                },
                '.active': {
                    color: '#4C4C4C',
                    structures: {
                        ' .value-switch__cels': {
                            color: '#fff'
                        }
                    }
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