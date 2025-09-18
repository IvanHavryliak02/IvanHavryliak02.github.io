const styleBuffer = {};

function getStyleSheet(){
    let styleSheet = document.querySelector('#components-styles');
    if(!styleSheet){
        return createStyleSheet();
    }
    return styleSheet.sheet;
}

function createStyleSheet(){
    const sheetTag = document.createElement('style');
    sheetTag.id = 'components-styles';
    document.head.appendChild(sheetTag);
    return sheetTag.sheet;
}


export default class Component{

    static styleSheet = getStyleSheet();
    static publicStyles = {};
    static dataOperator = {
        APIData: '',
        APIDataSubs: [],
        dataIsReady: async function(){
            Promise.all(this.APIDataSubs.map(startPromise => startPromise()))
            .then(() => {
                console.log('loaded');
            }).catch((error) => console.error("Can't find data at weather data object:", error.message))
        },
        subscribe: function (subscriberFunc){
            this.APIDataSubs.push(subscriberFunc);
        },
    };

    static promisesExecutor = {
        promisesQueue: [],
        addStarterToQueue: function(promiseStarter){
            this.promisesQueue.push(promiseStarter);
        },
        allDone: function(){
            const promises = this.promisesQueue.map(startPromise => startPromise());
            this.promisesQueue = [];
            Promise.all(promises)
            .then(() => {
                Component.dataOperator.dataIsReady();
            })
            .catch((error) => console.error(`Request error:`, error));
        }
    };

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
    };

    constructor(parent, elementType, elementSelector){
        this.parent = parent;
        this.elementType = elementType;
        this.elementSelector = elementSelector;
    }

    makeStylesPublic(elementSelector, styles){
        if(!Component.publicStyles[elementSelector]){
            Component.publicStyles[elementSelector] = styles;
        }
    }

    createElement(innerCode = ''){

        const element = document.createElement(this.elementType);

        const addSelector = (selector) => {
            if(selector.startsWith('.')){
                element.classList.add(`${selector.slice(1)}`);
            }else if(selector.startsWith('#')){
                element.id = `${selector.slice(1)}`;
            }
        }

        if(Array.isArray(this.elementSelector)){
            this.elementSelector.forEach(selector => {
                addSelector(selector);
            });
        }else{
            addSelector(this.elementSelector);
        }

        element.innerHTML = innerCode;
        return element;
    }

    applyStyles(){
        const selector = Array.isArray(this.elementSelector) ? this.elementSelector[0] : this.elementSelector;
        const styles = this.styles;
        if(!styles){
            console.error(`Can't find styles object of ${this.elementType}, selector: ${this.elementSelector}`);
        }

        createRules(styles, selector);

        function createRules(obj, header, media = ''){

            addRule(obj, header);

            for(let prop in obj){
                if(prop === 'pseudo'){
                    const pseudoes = obj[prop];
                    for(let pseudo in pseudoes){
                        const newHeader = `${header}${pseudo}`
                        
                        createRules(pseudoes[pseudo], newHeader, media);
                    }
                }
                if(prop === 'structures'){
                    const structures = obj[prop];

                    for(let structure in structures){
                        const newHeader = `${header}${structure}`;
                        createRules(structures[structure], newHeader, media);
                    }
                }
                if(prop === 'media'){
                    const media = obj[prop];
                    
                    for(let mediaRule in media){
                        const mediaHeader = `@media (${mediaRule})`;
                        createRules(media[mediaRule],`${header}`, mediaHeader);
                    }

                }
            }

            function addRule(localeObj, localeHeader){
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