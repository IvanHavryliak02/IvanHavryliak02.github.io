import './Modal.sass'
import Form from '../Form/Form'
import Button from '../Button/Button'

export default function Modal({render, setShowModal, goodsInCart, totalPrice}){
    const showedClass = render ? 'modal_show' : ''

    const rowGenerator = (goods) => {
        let groupedGoods = {}

        goods.forEach(good => {
            if(groupedGoods[good.name]){
                groupedGoods[good.name].quantity += 1
            } else {
                groupedGoods[good.name] = good;
                groupedGoods[good.name].quantity = 1;
            }
        })

        groupedGoods = Object.values(groupedGoods)

        return groupedGoods.map(good => (
            <>
                <div className="modal__good-img">
                    <img src={good.image} alt="good" />
                </div>
                <div className="modal__good-name">{good.name}</div>
                <div className="modal__good-price">{`${good.quantity} x ${good.price}zł`}</div>
            </>
        ))
    }

    return (
        <div className={`modal ${showedClass}`}>
            <h2 className="modal__title">Złóż zamówienie</h2>
            <div className="modal__sheet">
                {rowGenerator(goodsInCart)}
            </div>
            <span className="modal__total-price">{`Należność ogółem: ${totalPrice} zł`}</span>
            <Form/>
            <Button 
                style={
                    {position: 'absolute',
                    bottom: '20px',
                    right: '20px'}
                }
                color='gray'
                onClickHandler={() => {setShowModal(false)}}
            >
                Zamknij
            </Button>
        </div>
    )

}