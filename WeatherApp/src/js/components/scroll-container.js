import Component from '../modules/component.js'

export default class ScrollContainer extends Component{

    constructor(parent, elementType, selector, navAlign = {top: '-50px', right: '0'}){
        super(parent, elementType, selector);
        this.navAlign = navAlign;
        this.blockName = Array.isArray(selector) ? selector[0] : selector;
        this.blockName = this.blockName.slice(1);
        this.element = this.createElement(`
            <div class="${this.blockName}__nav">
                <div class="${this.blockName}__arrow-left">
                    <--
                </div>
                <div class="${this.blockName}__arrow-right">
                    -->
                </div>
            </div>
            <div class="${this.blockName}__content">
            
            </div>
        `);
        this.styles = this.getStyles();
        this.applyStyles();
        this.addListeners()
        
    }


    addListeners(){ 
        const scrollElement = this.element.querySelector(`.${this.blockName}__content`);
        
        let pos = scrollElement.scrollLeft;
        scrollElement.addEventListener('wheel', e => {
            e.preventDefault();
            scrollElement.scrollLeft += e.deltaY;
            pos = scrollElement.scrollLeft;
        })

        const nav = this.element.querySelector(`.${this.blockName}__nav`);
        nav.addEventListener('click', (e) => {
            if(e.target.closest(`.${this.blockName}__arrow-left`)){
                if(scrollElement.scrollLeft > 0){
                    pos -= 100;
                    if(pos < 0){
                        pos = 0;
                    }
                }   
            }
            if(e.target.closest(`.${this.blockName}__arrow-right`)){
                if(scrollElement.scrollLeft + scrollElement.clientWidth < scrollElement.scrollWidth){
                    pos += 100; 
                }
            }
            scrollElement.scrollTo({
                left: pos,
                behavior: 'smooth'
            })
        })
    }

    getStyles(){
        const scale = Component.dataOperator.userData.scale;
        const navWidth = 85 * scale;
        const navFZ = 23 * scale;
        const borderRadius = 10 * scale;

        let arrowSettings = {};
        for(let key in this.navAlign){
            let value = parseInt(this.navAlign[key]);
            value *= scale;
            arrowSettings[key] = `${value}px`
        }
        

        const theme = Component.dataOperator.userData.theme;
        const arrowColor = theme === 'light' ? '#4c4c4c' : '#ffffff';
        return {
            width: '100%',
            height: '100%',
            position: 'relative',
            structures: {
                [` .${this.blockName}__content`]: {
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    overflowX: 'scroll',
                    '-ms-overflow-style': 'none',
                    scrollbarWidth: 'none',
                    position: 'relative',
                    zIndex: '2',
                    pseudo: {
                        '::-webkit-scrollbar': {
                            width: '0',
                            height: '0'
                        },
                    },
                },
                [` .${this.blockName}__arrow-left`]: {
                    cursor: 'pointer',
                    color: arrowColor,
                },
                [` .${this.blockName}__arrow-right`]: {
                    cursor: 'pointer',
                    color: arrowColor,
                },
                [` .${this.blockName}__nav`]: {
                    width: `${navWidth}px`,
                    position: 'absolute',
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: `${navFZ}px`,
                    userSelect: 'none',
                    zIndex: '1000',
                    ...arrowSettings
                },
                '.scroll_modif': {
                    structures: {
                        ' .hourly-scroll__content': {
                            display: 'block',
                            borderRadius: `${borderRadius}px`
                        },
                        ' .daily-scroll__content': {
                            display: 'block',
                            borderRadius: `${borderRadius}px`
                        }
                    }
                    
                }
            }
        }
    }

}