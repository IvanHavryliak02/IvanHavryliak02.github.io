import './CartGoods.sass'
import bin from './../../icons/bin.svg'

import Button from '../Button/Button'

export default function CartGoods({goods, show, onCartShow, onGoodRemove, total, onShowedForm}) {

    const blockClass = show ? 'cart-goods_showed' : ''

    return (
        <div className={`cart-goods ${blockClass}`}>
            <h2 className="cart-goods__header">Mój koszyk</h2>
            <ul className="cart-goods__goods-list">
                {goods.map((item, i) => (
                    <li className="cart-goods__good" key={i}>
                        <div className="cart-goods__avatar-container">
                            <img src={item.image} alt="good" className="cart-goods__good-avatar" />
                        </div>
                        <div className="cart-goods__title">{item.name}</div>
                        <div className="cart-goods__price">{item.price} zł</div>
                        <button onClick={() => onGoodRemove(i, item.price)} className="cart-goods__bin-container">
                            <img className="cart-goods__bin" src={bin} alt='bin'/>
                        </button>
                    </li>
                ))}
            </ul>
            <div className="cart-goods__final-action">
                <div className="cart-goods__btn-group">
                    <Button onClickHandler={() => onCartShow(false)} color='gray'>cofnij</Button>
                    <Button onClickHandler={() => {
                        onShowedForm(true)
                        onCartShow(false)
                    }}>kupuje</Button>
                </div>
                <span className="cart__goods__total">{total} zł</span>
            </div>
        </div>
    )
}