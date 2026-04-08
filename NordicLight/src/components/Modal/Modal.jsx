import './Modal.sass'
import Form from '../Form/Form'
import Button from '../Button/Button'

export default function Modal({render, setShowModal, goodsInCart, totalPrice}){
    let groupedGoods = {}

    const createOrder = (billingData) => {
        console.log(billingData)
        const order = {
            payment_method: "cod",
            payment_method_title: "Cash on delivery",
            set_paid: false, 
            billing: { ...billingData },
            line_items: null
        };

        if(Array.isArray(groupedGoods)){
            order.line_items = groupedGoods.map(good => ({product_id: good.id, quantity: good.quantity}))
        }

        const settings = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        }

        const _CK = 'ck_af7a76719eb9de3b86dc4eaed03bac3d590ab4d0'
        const _CS = 'cs_c177b8ebdf25db6114e5b216e1e4feed0dc3fe08'

        const _orderUrl = `https://nordik-swiat.locale/wp-json/wc/v3/orders?consumer_key=${_CK}&consumer_secret=${_CS}`;

        console.log('Posting order...')
        fetch(_orderUrl, settings).then(resp => console.log(resp)).catch(err => console.error(err))
    } 

    const rowGenerator = (goods) => {

        goods.forEach(good => {
            if(groupedGoods[good.name]){
                groupedGoods[good.name].quantity += 1
            } else {
                groupedGoods[good.name] = good;
                groupedGoods[good.name].quantity = 1;
            }
        })

        groupedGoods = Object.values(groupedGoods)

        return groupedGoods.map((good, i) => (
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
        <div className={`modal ${render ? 'modal_show' : ''}`}>
            <h2 className="modal__title">Złóż zamówienie</h2>
            <div className="modal__sheet">
                {rowGenerator(goodsInCart)}
            </div>
            <span className="modal__total-price">{`Należność ogółem: ${totalPrice} zł`}</span>
            <Form createOrder={createOrder} cartIsEmpty={groupedGoods?.length === 0}/>
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