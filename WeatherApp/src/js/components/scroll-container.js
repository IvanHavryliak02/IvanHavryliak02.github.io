import Component from '../modules/component.js'

export default class ScrollContainer extends Component{

    constructor(parent, elementType, selector){
        super(parent, elementType, selector);
        this.element = this.createElement(`
            <div class="scroll-container__nav">
                <div class="scroll-container__arrow-left">
                    <--
                </div>
                <div class="scroll-container__arrow-right">
                    -->
                </div>
            </div>
            <div class="scroll-container__content">
            
            </div>
        `);
        this.styles = this.getStyles();
        this.applyStyles();
        this.addListeners();
    }

    addListeners(){
        
        const scrollElement = this.element.querySelector('.scroll-container__content');
        const nav = this.element.querySelector('.scroll-container__nav');
        let pos = scrollElement.scrollLeft;
        scrollElement.addEventListener('wheel', e => {
            e.preventDefault();
            scrollElement.scrollLeft += e.deltaY;
            pos = scrollElement.scrollLeft;
        })
        
        
        nav.addEventListener('click', (e) => {
            if(e.target.closest('.scroll-container__arrow-left')){
                if(scrollElement.scrollLeft > 0){
                    pos -= 100;
                    if(pos < 0){
                        pos = 0;
                    }
                }   
            }
            if(e.target.closest('.scroll-container__arrow-right')){
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
        return {
            width: '100%',
            height: '100%',
            position: 'relative',
            structures: {
                ' .scroll-container__content': {
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
                ' .scroll-container__arrow-left': {
                    marginRight: '20px',
                    cursor: 'pointer',
                },
                ' .scroll-container__arrow-right': {
                    cursor: 'pointer',
                },
                ' .scroll-container__nav': {
                    position: 'absolute',
                    right: '0',
                    display: 'flex',
                    top: '-50px',
                    fontSize: '20px',
                    color: '#4c4c4c',
                    userSelect: 'none',
                }
            }
        }
    }

}