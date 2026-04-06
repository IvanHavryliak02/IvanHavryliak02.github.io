import './CartGoods.sass'
import lamp from './../../images/lamp.jpg'
import bin from './../../icons/bin.svg'

export default function CartGoods({goods, show, onCartShow, onGoodRemove, total}) {

    const blockClass = show ? 'cart-goods_showed' : ''

    return (
        <div className={`cart-goods ${blockClass}`}>
            <h2 className="cart-goods__header">My Cart</h2>
            <ul className="cart-goods__goods-list">
                {goods.map((item, i) => (
                    <li className="cart-goods__good">
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
                    <button onClick={() => onCartShow(false)} className="cart-goods__btn cart-goods__btn_back">cofnij</button>
                    <button className="cart-goods__btn cart-goods__btn_buy">kupuje</button>
                </div>
                <span className="cart__goods__total">{total} zł</span>
            </div>
        </div>
    )
}