
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
        if(this.styles){
            let newRule = `.${this.elementClassName}{\n`;
            for(let styleProp in this.styles){
                if(typeof this.styles[styleProp] !== 'object'){
                    const cssProp = styleProp.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`);
                    const value = this.styles[styleProp];
                    newRule += `\t${cssProp}: ${value};\n`;
                }
            }
            newRule += '}'
            this.styleSheet.insertRule(newRule, this.styleSheet.length);
        }

        const pseudoClasses = this.styles.pseudoClasses;
        if(pseudoClasses){
            for(let psClassObjName in pseudoClasses){
                const psClass = psClassObjName.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`);
                let newRule = `.${this.elementClassName}:${psClass}{\n`
                for (let styleProp in pseudoClasses[psClassObjName]){
                    const cssProp = styleProp.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`);
                    const value = pseudoClasses[psClassObjName][styleProp];
                    newRule += `\t${cssProp}: ${value};\n`;
                }
                newRule += '}'
                this.styleSheet.insertRule(newRule, this.styleSheet.length);
            }
        }

        const pseudoElements = this.styles.pseudoElements;
        if(pseudoElements){
            for(let psElementName in pseudoElements){
                const psElement = psElementName.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`);
                let newRule = `.${this.elementClassName}::${psElement}{\n`
                for (let styleProp in pseudoElements[psElementName]){
                    const cssProp = styleProp.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`);
                    const value = pseudoElements[psElementName][styleProp];
                    newRule += `\t${cssProp}: ${value};\n`;
                }
                newRule += '}'
                this.styleSheet.insertRule(newRule, this.styleSheet.length);
            }
        }
    }

    render(){
        this.parent.appendChild(this.element);
    }
}