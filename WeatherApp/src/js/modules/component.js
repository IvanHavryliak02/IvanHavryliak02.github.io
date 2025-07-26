
export default class Component{
    constructor(parent, elementType, elementClassName){
        this.parent = parent;
        this.elementType = elementType;
        this.elementClassName = elementClassName;
    }

    createElement(innerCode = ''){
        const element = document.createElement(this.elementType);
        element.classList.add(this.elementClassName);
        element.innerHTML = innerCode;
        return element;
    }

    applyStyles(){
        for(let styleProp in this.styles){
            const value = this.styles[styleProp];
            if(typeof value === 'string' || typeof value === 'boolean'){
                this.element.style[styleProp] = value;
            }else if(typeof value === 'number'){
                this.element.style[styleProp] = `${value}px`;
            }
        }
    }

    render(){
        this.parent.appendChild(this.element);
    }
}