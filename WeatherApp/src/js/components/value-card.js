
import Component from '../modules/component.js'
import userData from '../modules/user-data.js';

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
            const progressItem = this.element.querySelector(`.${this.selector}__progress`); 
            let value = +this.element.querySelector(`.${this.selector}__value`).textContent; 
            const scale = userData.scale;
            const borderRadius = window.innerWidth <= 1200 ? 10 : Math.round(10 * scale);
            const min = this.barSettings.min; 
            const max = this.barSettings.max; 
            const startPoint = Number.parseInt(this.barSettings.startPoint);
            const dif = max - min;
            const startValue = dif * startPoint / 100 + min;
            if(value < min){
                value = min
            }
            if(value > max){
                value = max
            }
            if(value <= startValue && startPoint !== 0){
                progressItem.style.right = `-${startPoint}%`;
                progressItem.style.transform = 'translateX(-100%)'
                progressItem.style.left = '';
                progressItem.style.borderRadius = `${borderRadius}px 0 0 ${borderRadius}px`
                
            }
            if(value >= startValue && startPoint !== 0){
                progressItem.style.left = this.barSettings.startPoint
                progressItem.style.right = '';
                progressItem.style.transform = ''
                progressItem.style.borderRadius = `0 ${borderRadius}px ${borderRadius}px 0`
            }
            if(startPoint === 0){
                progressItem.style.borderRadius = `${borderRadius}px`
            }
            
            let width = 0;
            value = Math.abs(value - startValue);
            width = value / dif * 100;
            progressItem.style.width = `${width}%`

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
        const scale = userData.scale;
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
        const progressPadding = Math.round(3 * scale);
        const dividerHeight = Math.round(35 * scale);
        const borderRadius = Math.round(10 * scale)
        
        const barBorderRadius = Math.round(10 * scale);

        const theme = userData.theme;
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
                    padding: `${progressPadding}px`,                    
                    structures: {
                        [` .${this.selector}__progress`]: {
                            height: `100%`,
                            background: '#FFC300',
                            position: 'relative'
                        },
                        [` .${this.selector}__divider`]: {
                            display: 'none',
                            position: 'absolute',
                            width: `${dividerHeight}px`,
                            left: this.barSettings.startPoint,
                            top: '50%',
                            transform: 'translate(-50%, -50%) rotate(90deg)',
                            height: '1px', 
                            background: dividerColor
                        }
                    } 
                }
            },
            media: {
                'max-width: 1200px': {
                    minWidth: '110px',
                    height: '110px',
                    marginRight: '0',
                    borderRadius: '7px',
                    padding: '7px',
                    structures: {
                        [` .${this.selector}__label`]:{
                            fontSize: '16px'
                        },
                        [` .${this.selector}__value`]:{
                            fontSize: '28px',
                            margin: `20px 0`,
                            lineHeight: '21px',
                        },
                        [` .${this.selector}__progressbar`]: {
                            height: '16px',
                            borderRadius: '10px',
                            padding: '3px',
                            structures: {
                                [` .${this.selector}__divider`]: {
                                    width: '24px',
                                }
                                
                            }
                        }
                    },
                },
                'max-width: 620px': {
                    width: '100px',
                    minHeight: '115px',
                    height: 'auto',
                    marginBottom: '15px',
                    structures: {
                        [` .${this.selector}__label`]:{
                            fontSize: '14px'
                        },
                    }
                }
            }
        }
    }
}