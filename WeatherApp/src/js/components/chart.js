
import Component from '../modules/component.js';
import {
      Chart,
      LineController,
      LineElement,
      PointElement,
      LinearScale,
      Title,
      CategoryScale,
} from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, ChartDataLabels);

export default class ChartWrap extends Component{

    constructor(parent, elementType, selector, callback){
        super(parent, elementType, selector);
        this.blockName = Array.isArray(selector) ? selector[0] : selector;
        this.blockName = this.blockName.slice(1);
        this.element = this.createElement(`
            <canvas class="${this.blockName}__chart"></canvas>

        `)
        this.styles = this.getStyles();
        this.applyStyles();
        this.chart = this.createNewChart();
        Component.dataOperator.subscribe(() => {this.fillData(callback)});
    }

    fillData = async (callback) => {
        try{
            const plotData = callback();
            const config = this.chart.config._config;
            config.data.labels = plotData.x;
            config.data.datasets[0].data = plotData.y;
            config.options.scales.y.suggestedMin = Math.min(...plotData.y) - 2;
            config.options.scales.y.suggestedMax = Math.max(...plotData.y) + 2;
            this.chart.update()
            
        }catch(err){console.error(`Horly trend arror:`, err.message)}
    }

    createNewChart(){
        const chart = this.element.querySelector(`.${this.blockName}__chart`);
        const scale = Component.dataOperator.userData.scale;
        const fontSize = 20 * scale;
        const theme = Component.dataOperator.userData.theme;
        const borderColor = theme === 'light' ? '#4C4C4C' : '#ffffff'
        return new Chart(chart, {
            type: 'line',
            data: {
                datasets: [{
                    borderColor: borderColor ,
                    borderWidth: 1,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        grid: {display: false},
                        ticks: {
                            color: borderColor,
                            font: {
                                family: 'Inter',
                                size: `${fontSize}px`
                            }
                        }
                    },
                    y: {
                        ticks: {
                            display: false,
                            font: {
                                family: 'Inter',
                                
                            }
                        }
                    }
                },
                plugins: {
                    datalabels: {
                        
                        anchor: 'end',
                        align: 'top',
                        color: borderColor,
                        font: { weight: 'normal', family: 'Inter', size: `${fontSize}px` }
                    }
                } 
            }
        });
    }

    getStyles(){
        const scale = Component.dataOperator.userData.scale;
        const height = 330 * scale;
        return {
            width: `200%`,
            height: `${height}px`,
        }
    }
    
}