
import Component from '../modules/component.js'

export default class ValueCard extends Component{
    constructor(
            parent, 
            elementType, 
            selector, 
            label, 
            valueCallback,
            barSettings = {
                background: '#000', 
                startPoint: '50%',
                min: 0,
                max: 100,
                dividerShow: true,
            } 
            
        ){
            super(parent, elementType, selector);
            this.selector = selector.slice(1);
            this.valueCallback = valueCallback;
            this.barSettings = barSettings;
            this.element = this.createElement(`
                <span class="${this.selector}__label">
                    ${label}
                </span>
                <div class="${this.selector}__value"></div>
                <div class="${this.selector}__progressbar">
                    <div class="${this.selector}__progress"></div>
                    <div class="${this.selector}__divider"></div>
                </div>    
            `);
            this.styles = this.getStyles();
            this.applyStyles();
            this.showDivider();
            Component.dataOperator.subscribe(this.fillData);
            Component.dataOperator.subscribe(this.fillProgress);
        }

    fillProgress = async () => {
        try{
            const progressBar = this.element.querySelector(`.${this.selector}__progressbar`);
            const progressItem = this.element.querySelector(`.${this.selector}__progress`); 
            let value = this.element.querySelector(`.${this.selector}__value`).textContent;
            value = Number.parseInt(value);
            const min = this.barSettings.min;
            const max = this.barSettings.max;
            const startPoint = Number.parseInt(this.barSettings.startPoint);

            const valueDiff = max - min;
            const pxBarWidth = progressBar.offsetWidth - 7;
            const scale = valueDiff / pxBarWidth;
            const valueStart = (startPoint / 100 * valueDiff) + min
            const valueProgress = Math.abs(valueStart - value);
            let width = valueProgress / scale;
            if(value <= min){
                width = ((valueStart - min) / scale)
            }
            if(value >= max){
                width = ((max - valueStart) / scale)
            }
            
            if(value <= valueStart && startPoint !== 0){
                progressItem.style.right = this.barSettings.startPoint;
                progressItem.style.left = '';
                progressItem.style.borderRadius = '10px 0 0 10px'
                
            }
            if(value >= valueStart && startPoint !== 0){
                progressItem.style.left = this.barSettings.startPoint
                progressItem.style.right = '';
                progressItem.style.borderRadius = '0 10px 10px 0'
            }
            if(startPoint === 0){
                progressItem.style.borderRadius = '10px 10px 10px 10px'
                progressItem.style.left = '3px'
            }
            if(valueStart === 0 && value >= max){
                progressBar.style.justifyContent = 'center'
            }
            progressItem.style.width = `${Math.round(width)}px`

        }catch(err){
            console.error(`${this.elementSelector} can't find his data:`, err.message)
        }
    }

    showDivider(){
        if(this.barSettings.dividerShow){
            this.element.querySelector(`.${this.selector}__divider`).style.display = 'block';
        }
    }

    fillData = async () => {
        try{
            const data = this.valueCallback();
            this.element.querySelector(`.${this.selector}__value`).textContent = data;
        }catch(err){
            console.error(`${this.elementSelector} can't find his data:`,err.message)
        }
    }

    getStyles(){
        const parentHeight = Component.publicStyles['#right-panel'].height;
        const height = 150/960 * parentHeight;

        const valueMT = 20/150 * height; 
        const valueMB = 17.5/150 * height; 
        const valueFZ = 36/150 * height;
        const valueLH = 44/150 * height;

        let barheight = Math.round(20/150 * height);
        const wrapHeight = Math.round(barheight - 6);
        const dividerHeight = Math.round(35/20 * barheight);

        return {
            height: `${height}px`,
            minWidth: `${height}px`,
            borderRadius: `15px`,
            padding: '10px 8px',
            background: '#fff',
            color: '#4c4c4c',
            structures: {
                [` .${this.selector}__label`]: {
                    color: '#7C7C7C',
                    display: 'block',
                    textAlign: 'center',
                },
                [` .${this.selector}__value`]: {
                    textAlign: 'center',
                    margin: `${valueMT}px 0 ${valueMB}px 0`,
                    fontSize: `${valueFZ}px`,
                    lineHeight: `${valueLH}px`
                },
                [` .${this.selector}__progressbar`]: {
                    border: '0.5px solid rgba(76,76,76,0.3)',
                    height: `${barheight}px`,
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    position: 'relative',
                    structures: {
                        [` .${this.selector}__progress`]: {
                            background: this.barSettings.background,
                            height: `${wrapHeight}px`,
                            width: '0',
                            position: 'absolute',
                        },
                        [` .${this.selector}__divider`]: {
                            display: 'none',
                            position: 'absolute',
                            width: `${dividerHeight}px`,
                            left: `${this.barSettings.startPoint}`,
                            top: '50%',
                            transform: 'translate(-50%, -50%) rotate(90deg)',
                            height: '1px', 
                            background: 'rgba(76,76,76,0.3)'
                        }
                    } 
                }
            }
        }
    }
}