import './Cart.sass'
import cart from './../../icons/cart.svg'

export default function Cart({goodCount}) {

    return (
        <div className="cart"> 
            <img src={cart} alt="cart"/>
            <div className="cart__good-count">{goodCount}</div>
        </div>
    )
}