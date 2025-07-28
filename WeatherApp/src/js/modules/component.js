
import createStyleSheet from './sheet-gen.js';

export default class Component{
    constructor(parent, elementType, elementClassName){
        this.parent = parent;
        this.elementType = elementType;
        this.elementClassName = elementClassName;
        this.styleSheet = this.getStyleSheet();
    }

    createElement(innerCode = ''){
        const element = document.createElement(this.elementType);
        element.classList.add(this.elementClassName);
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
        const cssSheet = this.styleSheet;
        const selector = this.elementClassName;
        const styles = this.styles;

        createNewRule(styles);

        function convCamelToKebab(camelExp){ 
            return camelExp.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`);
        }

        function createNewRule(obj, pseudo = '', media = ''){
            const fullSelector = `.${selector}${pseudo}`;
            let ruleBody = createCssProps(obj);
            
            if(ruleBody){
                let rule = `${fullSelector} {\n${ruleBody}}\n`
                if(media) {
                    rule = `${media} {\n${rule}}\n`
                }
                cssSheet.insertRule(rule, cssSheet.cssRules.length);
            }

            for(let prop in obj){
                const value = obj[prop];

                if(typeof value === 'object'){
                    if(/^:/.test(prop)){
                        createNewRule(value, `${pseudo}${convCamelToKebab(prop)}`, media);
                    }
                    else if(/^@media/.test(prop)){
                        createNewRule(value, pseudo, prop);
                    }
                }
            }
        }

        function createCssProps(obj){
            let props = '';
            if(obj){
                for(let prop in obj){
                    if(typeof obj[prop] !== 'object'){
                        props += `\t${convCamelToKebab(prop)}: ${obj[prop]};\n`;
                    }
                }
                return props;
            }
        }
    }

    render(){
        this.parent.appendChild(this.element);
    }
}