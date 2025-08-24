
import Component from '../modules/component.js'

export default class More extends Component{

    constructor(parent, elementType, selector){
        super(parent, elementType, selector);
        this.element = this.createElement(`
            <img class="show-more__img" alt="Show more" src="icons/lightTheme/ico-stat.svg">
            <span class="show-more__title">Show more</span>    
        `)
        this.styles = this.getStyles();
        this.applyStyles();
    }

    getStyles(){
        const parentHeight = Component.publicStyles['#right-panel'].height;
        const height = 150/960 * parentHeight;
        const imgSize = 78/150 * height;
        const imgMB = 20/150 * height;
        const titleFS = imgMB; 
        const titleLH = titleFS + 4;

        return {
            height: `${height}px`,
            minWidth: `${height}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            background: '#fff',
            borderRadius: '15px',
            structures: {
                ' .show-more__img': {
                    display: 'block',
                    width: `${imgSize}px`,
                    height: `${imgSize}px`,
                    marginBottom: `${imgMB}px`,
                },
                ' .show-more__title': {
                    fontSize: `${titleFS}px`,
                    lineHeight: `${titleLH}px`
                }
            } 
        }
    }
}