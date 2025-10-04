import Component from "../modules/component";
import userData from "../modules/user-data";

export default class LoadingScreen extends Component {

    constructor(parent, elementType, selector){
        super(parent, elementType, selector);
        this.element = this.createElement(`
            <div class="load-screen__wrap">
                <div class="load-screen__loader"></div>
                <div class="load-screen__load-status status"></div> 
            </div> 
        `)
        this.styles = this.getStyles();
        this.applyStyles();
    }
    
    hide(){
        setTimeout(() => {
            document.querySelector('#app-body').classList.remove('hide')
            this.element.classList.add('hidden');
        }, 1000)
    }

    setStatus(status, statusType){
        const statusBlock = this.element.querySelector('.status');
        switch(statusType){
            case 'err': 
                statusBlock.style.color = '#f44444ff'
                break;
            case 'warn':
                statusBlock.style.color = '#f8c325ff'
                break;
            default: 
                statusBlock.style.color = ''
                break;
        }
        statusBlock.textContent = status
    }

    show(){
        this.element.classList.remove('hidden');
        setTimeout(() => {
            document.querySelector('#app-body').classList.add('hide')         
        }, 600)
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
            transition: 'width 1s, height 1s, opacity 0.5s',
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
                ' .load-screen__wrap': {
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center'
                },
                '.hidden': {
                    width: '0',
                    height: '0',
                    opacity: '0',
                }
            }
        }
    }

    
}