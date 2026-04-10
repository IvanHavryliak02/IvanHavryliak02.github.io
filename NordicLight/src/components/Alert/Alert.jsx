import './Alert.sass'
import successImg from './../../icons/success.svg'
import errorImg from './../../icons/error.svg'
export default function Alert({message, success}){

    const imgSrc = success ? successImg : errorImg

    return (
            <div className="alert">
                <div className="alert__img-container">
                    <img src={imgSrc} alt="" className="alert__img" />
                </div>
                <span className="alert__status">{message}</span>
            </div>
    )
}