
import './App.css'
import { useState } from 'react'
import Header from './components/Header/Header'
import MainSection from './components/MainSection/MainSection'
import CartGoods from './components/CartGoods/CartGoods'



function App() {

    const [goodsInCart, setGoodsInCart] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [showCartGoods, setShowCartGoods] = useState(false)

    const addGoodToCart = (good) => {
        const lighterObj = {name: good.name, image: good.image, price: good.price}
        setTotalPrice(prevPrice => prevPrice + +good.price)
        setGoodsInCart(prevArr => [...prevArr, lighterObj])
    }

    const removeGoodFromCart = (goodId, goodPrice) => {
        setTotalPrice(prevPrice => prevPrice - +goodPrice)
        setGoodsInCart(prev => [
            ...prev.slice(0, goodId),
            ...prev.slice(goodId + 1)
        ]);
    }

    return (
        <>
            <Header 
                goodCount={goodsInCart.length}
                onCartShow={setShowCartGoods}
            />
            <MainSection onGoodsSet={addGoodToCart}/>
            <CartGoods 
                show={showCartGoods} 
                onCartShow={setShowCartGoods}
                goods={goodsInCart}
                onGoodRemove={removeGoodFromCart}
                total={totalPrice}
            />
        </>
    )
}

export default App
