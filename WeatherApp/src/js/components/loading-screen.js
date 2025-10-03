import Component from "../modules/component";
import userData from "../modules/user-data";

export default class LoadingScreen extends Component {

    constructor(parent, elementType, selector){
        super(parent, elementType, selector);
        this.element = this.createElement(`
            <div class="load-screen__loader"></div>
            <div class="load-screen__load-status status">checking your location</div>    
        `)
        this.styles = this.getStyles();
        this.applyStyles();
        this.timers = this.setStatus();
    }

    hide(){
        this.timers.forEach(timer => clearTimeout(timer));
        this.element.querySelector('.status').textContent = 'Done'
        setTimeout(() => {
            this.element.classList.add('hidden');
            document.querySelector('#app-body').classList.remove('hide')
        }, 700)
    }

    getStyles(){
        const background = userData.theme === 'light' ? '#e8e6e6ff' : '#4a4a4a'
        const color = userData.theme === 'light' ? '#4a4a4a' : '#e8e6e6ff'
        return {
            background: `${background}`,
            color: `${color}`,
            width: `100vw`, 
            height: `100vh`, 
            display: `flex`,
            flexDirection: `column`,
            justifyContent: `center`,
            alignItems: `center`,
            position: `absolute`,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: `10000`,
            transition: 'width 1s, height 1s, opacity 1s',
            structures: {
                ' .load-screen__loader': {
                    width: `50px`,
                    height: `50px`,
                    borderRadius: `25px`,
                    borderTop: `5px solid #ffffff`,
                    borderRight: `5px solid #FFC300`,
                    borderBottom: `5px solid #1BA8FF`,
                    borderLeft: `5px solid #FF2828`,
                    marginBottom: `15px`,
                    animation: `spin 2s ease infinite`,
                },
                '.hidden': {
                    width: '0',
                    height: '0',
                    opacity: '0',

                }
            }
        }
    }

    setStatus(){
        const status = this.element.querySelector('.load-screen__load-status');
        let i = 0;
        
        const timers = [
            changeData('Requesting geolocation'),
            changeData('Waiting for forecast'), 
        ]

        return timers

        function changeData(text){
            i++
            return setTimeout(() => {
                status.textContent = text;
            }, i*1000)
        }
    }
}