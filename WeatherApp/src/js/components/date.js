
export default class Day{
    constructor(parent){
        this.parent = parent;
        this.styles = this.getStyles();
        this.date = this.readCurrDate();
        this.element = this.createElement();
        this.fillData();
        this.applyStyle();
    }

    readCurrDate(){
        const now = new Date(),
              days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
              day = days[now.getDay()];
        return {
            time: now.getHours(),
            day: day
        }
    }

    getStyles(){
        const parentHeight = this.parent.offsetHeight,
              fontSize = Math.round(parentHeight * 0.0417);
        return {fontSize: fontSize};
    }

    createElement(){
        const element = document.createElement('div')
        element.classList.add('today')
        element.innerHTML = `
            <span class="today__day"></span>
            <span class="today__time"></span>
        `
        return element;
    }

    fillData(){
        this.element.querySelector('.today__day').textContent = this.date.day + ',';
        this.element.querySelector('.today__time').textContent = this.date.time + ':00';
    }

    applyStyle(){
        for(let styleProp in this.styles){
            const value = this.styles[styleProp];
            this.element.style[styleProp] = value + 'px'
        }
    }

    render(){
        this.parent.appendChild(this.element);
    }
}