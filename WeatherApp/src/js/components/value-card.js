
import Component from '../modules/component.js'

export default class ValueCard extends Component{
    constructor(
            parent, 
            elementType, 
            selector, 
            label, 
            valueCallback,
            barSettings = { 
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
            let value = +this.element.querySelector(`.${this.selector}__value`).textContent;
            const min = this.barSettings.min;
            const max = this.barSettings.max;
            const startPoint = Number.parseInt(this.barSettings.startPoint);

            const valueDiff = max - min;
            const pxBarWidth = progressBar.offsetWidth - 8;
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
        const scale = Component.dataOperator.userData.scale;
        const width = 150 * scale;
        const height = 150 * scale;
        const marginRight = 33 * scale;
        const padding = 10 * scale;
        const labelFZ = 20 * scale;
        const labelLH = labelFZ + 4 * scale;
        

        const valueMT = 20 * scale; 
        const valueMB = 17 * scale; 
        const valueFZ = 36 * scale;
        const valueLH = valueFZ + 7 * scale;

        const barHeight = Math.round(20 * scale);
        const progressHeight = Math.round(barHeight - 6);
        const dividerHeight = Math.round(35 * scale);
        const borderRadius = Math.round(10 * scale)
        
        const barBorderRadius = Math.round(10 * scale);

        const theme = Component.dataOperator.userData.theme;
        const background = theme === 'light' ? '#ffffff' : '#5e5e5e';
        const color = theme === 'light' ? '#4c4c4c' : '#ffffff';
        const labelColor = theme === 'light' ? '#7C7C7C' : 'rgba(255,255,255,0.8)';
        const barBorderColor = theme === 'light' ? 'rgba(76,76,76,0.3)' : 'rgba(255,255,255,0.5)';
        const dividerColor = theme === 'light' ? 'rgba(76,76,76,0.3)' : '#ffffff';
        return {
            minWidth: `${width}px`,
            height: `${height}px`,
            marginRight: `${marginRight}px`,
            borderRadius: `${borderRadius}px`,
            padding: `${padding}px`,
            background: background,
            color: color,
            
            structures: {
                [` .${this.selector}__label`]: {
                    fontSize: `${labelFZ}px`,
                    lingHeight: `${labelLH}px`,
                    color: labelColor,
                    display: 'block',
                    textAlign: 'center',
                },
                [` .${this.selector}__value`]: {
                    margin: `${valueMT}px 0 ${valueMB}px 0`,
                    fontSize: `${valueFZ}px`,
                    lineHeight: `${valueLH}px`,
                    textAlign: 'center',
                },
                [` .${this.selector}__progressbar`]: {
                    border: `1px solid ${barBorderColor}`,
                    height: `${barHeight}px`,
                    borderRadius: `${barBorderRadius}px`,
                    display: 'flex',
                    alignItems: 'center',
                    position: 'relative',
                    structures: {
                        [` .${this.selector}__progress`]: {
                            height: `${progressHeight}px`,
                            background: '#FFC300',
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
                            background: dividerColor
                        }
                    } 
                }
            }
        }
    }
}