
import Component from '../modules/component.js';
import userData from '../modules/user-data.js';
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
            config.options.scales.y.suggestedMin = Math.min(...plotData.y) - 5;
            config.options.scales.y.suggestedMax = Math.max(...plotData.y) + 5;
            this.chart.update()
            
        }catch(err){console.error(`Horly trend arror:`, err.message)}
    }

    whenResized(){

    }

    createNewChart(){
        const chart = this.element.querySelector(`.${this.blockName}__chart`);
        const scale = userData.scale;
        const fontSize = 20 * scale;
        const theme = userData.theme;
        const borderColor = theme === 'light' ? '#4C4C4C' : '#ffffff'
        const gridColor = theme === 'light' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)';
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
                onResize(chart){
                    if(window.innerWidth <= 1200){
                        chart.options.scales.x.ticks.font.size = 14;
                        chart.options.scales.y.ticks.font.size = 14;
                        chart.options.plugins.datalabels.font.size = 14;  
                    }
                    chart.update();
                },
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
                        grid: {
                            color: gridColor
                        },
                        ticks: {
                            display: false,
                            font: {
                                family: 'Inter',
                                
                            }
                        },
                        border: {
                            display: false
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
        const scale = userData.scale;
        const height = 330 * scale;
        const widthPadding = 35 * scale;
        const heightPadding = 50 * scale;

        const theme = userData.theme;
        const background = theme === 'light' ? '#ffffff' : '#5a5a5a'
        return {
            width: `200%`,
            height: `${height}px`,
            padding: `${heightPadding}px ${widthPadding}px`,
            background: background,
            media: {
                'max-width: 1200px': {
                    height: '240px',
                    width: `300%`,
                },
                'max-width: 620px': {
                    width: `400%`,
                }
            }
        }
    }
    
}