import './MainSection.sass'
import { useEffect, useState } from 'react'
import sale from './../../icons/sale.svg'

import Button from './../Button/Button'
import Spinner from './../Spinner/Spinner'

export default function MainSection({onGoodsSet, onCategoriesChange, filters}) {

    const [data, setData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [loading, setLoading] = useState(false)

    const dataFiltration = () => {
        if(filters.length !== 0) {
            setFilteredData(data.filter(obj => filters.includes(obj.category)))
        } else {
            setFilteredData(data)
        }
    }

    const options = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    }

    const _URL = 'https://nordik-swiat.locale/wp-json/wc/v3/products?per_page=50&consumer_key=ck_1ff24d44e015e216779d0848a53fb99884ece24d&consumer_secret=cs_878a8ea1382122f8f22263c89cb9a4ccc10e8f20'

    useEffect(() => {
        setLoading(true)
        fetch(_URL, options)
        .then(resp => {
            if(!resp.ok) {
                throw new Error(resp)
            }; 
            return resp.json()
        }).then(resp => {
            setData(resp);
            setLoading(false)
        })
    }, [])

    useEffect(() => {
        const resObj = {}
        data.forEach(item => {
            if(!resObj[item.category]){
                resObj[item.category] = item.category
            }
        })
        onCategoriesChange(resObj)
        dataFiltration() 
    }, [data])

    useEffect(dataFiltration, [filters])

    const createCards = () => {


        return filteredData.map(item =>{
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
                                <Button
                                    buy={true} 
                                    onClickHandler={() => {onGoodsSet(item)}}
                                >
                                    kupuję
                                </Button>
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

    const content = loading ? <Spinner/> : createCards()

    return (
        <main className='shop-content'>
            <div className="container">
                <div className="shop-content__wrap-grid">
                    {content}
                </div>
            </div>
        </main>
    ) 
}