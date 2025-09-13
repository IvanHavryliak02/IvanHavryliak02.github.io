
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
        const borderRadius = 10 / 45 * height;
        const animationDuration = '0.7s'
        
        const theme = Component.dataOperator.userData.theme;
        const color = theme === 'light' ? '#ffffff' : '#4c4c4c'
        const background = theme === 'light' ? '#4c4c4c' : '#ffffff'
        const borderColor = theme === 'light' ? 'rgba(76, 76, 76, 0.4)' : '#8c8c8c'
        return {
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