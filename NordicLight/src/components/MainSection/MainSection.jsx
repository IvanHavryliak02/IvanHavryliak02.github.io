import './MainSection.sass'
import { useEffect, useState } from 'react'
import sale from './../../icons/sale.svg'

export default function MainSection({onGoodsSet}) {

    const [data, setData] = useState([])

    const options = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    }

    const _URL = 'https://nordik-swiat.locale/wp-json/wc/v3/products?consumer_key=ck_1ff24d44e015e216779d0848a53fb99884ece24d&consumer_secret=cs_878a8ea1382122f8f22263c89cb9a4ccc10e8f20'

    useEffect(() => {
        fetch(_URL, options)
        .then(resp => {
            if(!resp.ok) {
                throw new Error(resp)
            }; 
            return resp.json()
        }).then(resp => {
            setData(resp); 
        })
    }, [])

    const createCards = () => {

        console.log(data[0])


        return data.map(item =>{
                const discPrice = item.on_sale ? <span className="card__disc-price">{item.sale_price} zł</span> : null
                const lineTrough = item.on_sale ? {textDecoration: 'line-through', color: '#8a7f7f'} : {}
                const saleHtmlComp = item.on_sale ? <div className='card__sale-item'>
                    <img src={sale} alt="sale"/>
                </div> : null

                return (
                    <div className="card" key={item.id}>
                        {saleHtmlComp}
                        <div className="card__img-container">
                            <img src={item.image} alt="card avatar" className="card__img"/>
                        </div>
                        <div className="card__text-wrap">
                            <span className="card__name">{item.name}</span>
                            <p className="card__descr">
                                {item.short_description}
                            </p>
                            <div className="card__price-container">
                                <button onClick={() => {onGoodsSet(item)}}className="card__btn-buy">
                                    kupuję
                                </button>
                                <div className="card__price-wrap">
                                    <span className="card__price" style={lineTrough}>{item.regular_price} zł</span>
                                    {discPrice}
                                </div>
                                
                            </div>
                        </div>
                    </div>
                )
            }
        )
    }

    return (
        <main className='shop-content'>
            <div className="container">
                <div className="shop-content__wrap-grid">
                    {createCards()}
                </div>
            </div>
        </main>
    ) 
}