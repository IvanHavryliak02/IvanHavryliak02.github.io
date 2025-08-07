
import createStyleSheet from './sheet-gen.js';

const styleBuffer = {};

function getStyleSheet(){
    let styleSheet = document.querySelector('#components-styles');
    if(!styleSheet){
        return createStyleSheet();
    }
    return styleSheet.sheet;
}


export default class Component{

    static styleSheet = getStyleSheet();
    static publicStyles = {};
    static promisesExecutor = {
        pendingPromises: [],
        addStarterToQueue: function(promiseStarter){
            this.pendingPromises.push(promiseStarter)
        },
        allDone: function(){
            const promises = this.pendingPromises.map(startPromise => startPromise());
            Promise.all(promises)
            .then(() => {
                console.log('Loaded')
            })
            .catch((error) => console.error(`Promises error:`, error));
        }
    };

    constructor(parent, elementType, elementSelector){
        this.parent = parent;
        this.elementType = elementType;
        this.elementSelector = elementSelector;
    }

    static injectCssRules(){
        const restRules = [];
        for(let selector in styleBuffer){
            if(typeof styleBuffer[selector] !== 'object' ){
                const newRule = `${selector}{${styleBuffer[selector]}}`;
                Component.styleSheet.insertRule(newRule, this.styleSheet.cssRules.length)
                //console.log(newRule);
            }else{
                let mediaBody = '';
                const mediaRules = styleBuffer[selector];
                for(let selector in mediaRules){
                    mediaBody += `\n${selector}{${mediaRules[selector]}}`
                }
                restRules.push(`${selector}{${mediaBody}}`)
            }
        }
        for(let restRule of restRules){
            Component.styleSheet.insertRule(restRule, this.styleSheet.cssRules.length)
            //console.log(restRule)
        }
    }

    makeStylesPublic(elementSelector, styles){
        if(!Component.publicStyles[elementSelector]){
            Component.publicStyles[elementSelector] = styles;
        }
    }

    createElement(innerCode = ''){
        const element = document.createElement(this.elementType);
        if(this.elementSelector.startsWith('.')){
            element.classList.add(`${this.elementSelector.slice(1)}`);
        }else if(this.elementSelector.startsWith('#')){
            element.id = `${this.elementSelector.slice(1)}`;
        }
        element.innerHTML = innerCode;
        return element;
    }

    applyStyles(){
        const selector = this.elementSelector;
        const styles = this.styles;
        if(!styles){
            console.error(`Can't find styles object of ${this.elementType}, selector: ${this.elementSelector}`);
        }

        createRules(styles, selector);

        function createRules(obj, header, media = ''){

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
                        createRules(structures[structure], `${header}${structure}`, media);
                    }
                }
                if(prop === 'media'){
                    const media = obj[prop];
                    
                    for(let mediaRule in media){
                        const mediaHeader = `@media ${mediaRule}`;
                        createRules(media[mediaRule],`${header}`, mediaHeader);
                    }

                }
            }

            function addStylesRule(localeObj, localeHeader){
                const props = createCssProps(localeObj);
                if(props){
                    if(media){ 
                        if(!styleBuffer[media]){
                            styleBuffer[media] = {};
                        }
                        const mediaObj = styleBuffer[media];
                        if(!mediaObj[localeHeader]){
                            mediaObj[localeHeader] = props;
                        }
                    }else{
                        if(!styleBuffer[localeHeader]){
                            styleBuffer[localeHeader] = props;
                        }
                    }
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