import './logo.sass'
import blub from './../../icons/blub.svg'

export default function Logo ({white}) { 

    const whiteStyle = white ? {color: '#ffffff'} : {}

    return (
        <a href="" className="logo">
            <span className='logo__text' style={whiteStyle}>Nordic Świat</span>
            <div className="logo__container">
                <img src={blub} alt="blub" className="logo__ico"/>
            </div>
        </a>
    )
}