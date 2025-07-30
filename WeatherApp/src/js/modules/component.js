
import createStyleSheet from './sheet-gen.js';

const styleIdObj = {};

export default class Component{
    constructor(parent, elementType, elementSelector){
        this.parent = parent;
        this.elementType = elementType;
        this.elementSelector = elementSelector;
        this.styleSheet = this.getStyleSheet();
    }

    createElement(innerCode = ''){
        const element = document.createElement(this.elementType);
        if(this.elementSelector.startsWith('.')){
            element.classList.add(`${this.elementSelector.slice(1)}`);
        }else if(this.elementSelector.startsWith('#')){
            element.id = `${this.elementSelector}`;
        }
        element.innerHTML = innerCode;
        return element;
    }

    getStyleSheet(){
        let styleSheet = document.querySelector('#components-styles');
        if(!styleSheet){
            return createStyleSheet();
        }
        return styleSheet.sheet;
    }

    applyStyles(){
        const sheet = this.styleSheet;
        const selector = this.elementSelector;
        const styles = this.styles;

        createRule(styles, selector);

        function createRule(obj, header, media = ''){

            addStylesRule(obj, header);

            for(let prop in obj){
                if(prop === 'pseudo'){
                    const pseudoes = obj[prop];
                    for(let pseudo in pseudoes){
                        const newHeader = `${header}${pseudo}`
                        addStylesRule(pseudoes[pseudo], newHeader);
                    }
                }
                if(prop === 'structures'){
                    const structures = obj[prop];

                    for(let structure in structures){
                        createRule(structures[structure], `${header} ${structure}`, media);
                    }
                }
                if(prop === 'media'){
                    const media = obj[prop];
                    
                    for(let mediaRule in media){
                        const mediaHeader = `@media ${mediaRule}`;
                        createRule(media[mediaRule],`${header}`, mediaHeader);
                    }

                }
            }

            function addStylesRule(localeObj, localeHeader){
                const props = createCssProps(localeObj);
                if(props){
                    let rule = `${localeHeader}{${props}}`;
                    if(media){
                        rule = `${media}{${rule}}`;
                    }
                    sheet.insertRule(rule, sheet.cssRules.length);
                    console.log(rule)
                }
            }
        }

        function createCssProps(obj){
            let result = ''
            for(let prop in obj){
                if(typeof obj[prop] !== 'object'){
                    const cssProp = convCamelToKebab(prop);
                    const value = obj[prop];
                    result += `${cssProp}:${value};`
                }
            }
            return result;
        }

        function convCamelToKebab(camelExp){ 
            return camelExp.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`);
        }
    }

    render(){
        this.parent.appendChild(this.element);
    }
}