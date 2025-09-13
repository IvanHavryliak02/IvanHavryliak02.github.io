
import Component from '../modules/component.js'

export default class More extends Component{

    constructor(parent, elementType, selector){
        super(parent, elementType, selector);
        this.element = this.createElement(`
            <img class="show-more__img" alt="Show more" ">
            <span class="show-more__title">Show more</span>    
        `)
        this.setImageSrc();
        this.styles = this.getStyles();
        this.applyStyles();
        this.addListeners();
    }

    setImageSrc(){
        const theme = Component.dataOperator.userData.theme;
        const srcFolder = theme === "light" ? 'lightTheme' : 'darkTheme';
        const src = `icons/${srcFolder}/ico-stat.svg`;
        this.element.querySelector('.show-more__img').src = src;
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
            content.forEach(item => item.classList.add('more'));
        })
    }

    getStyles(){
        const parentHeight = Component.publicStyles['#right-panel'].height;
        const parentWidth = Component.publicStyles['#right-panel'].width;
        const height = 150/960 * parentHeight;
        const imgSize = 78/150 * height;
        const imgMB = 20/150 * height;
        const titleFS = imgMB; 
        const titleLH = titleFS + 4;

        const theme = Component.dataOperator.userData.theme;
        const background = theme === "light" ? '#ffffff' : '#5e5e5e';
        const titleColor = theme === "light" ? '#4c4c4c' : '#ffffff';

        return {
            height: `${height}px`,
            minWidth: `${height}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            background: background,
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
                    lineHeight: `${titleLH}px`,
                    color: titleColor,
                }
            },
            pseudo: {
                ':hover': {
                    cursor: 'pointer'
                }
            }
        }
    }
}