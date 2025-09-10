
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
        return new Chart(chart, {
            type: 'line',
            data: {
                datasets: [{
                    borderColor: '#4C4C4C',
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
                    y: {
                        ticks: {
                            display: false,
                            font: {
                                family: 'Inter'
                            }
                        }
                    },
                    x: {
                        grid: {display: false},
                        ticks: {
                            font: {
                                family: 'Inter'
                            }
                        }
                    }
                },
                plugins: {
                    datalabels: {
                        anchor: 'end',
                        align: 'top',
                        color: '#4c4c4c',
                        font: { weight: 'normal', family: 'Inter' }
                    }
                } 
            }
        });
    }

    getStyles(){
        const parentHeight = Component.publicStyles['#right-panel'].height;
        const height = 300/884 * parentHeight;
        return {
            width: `200%`,
            height: `${height}px`,
        }
    }
    
}