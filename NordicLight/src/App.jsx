
import './App.css'
import { useState } from 'react'
import Header from './components/Header/Header'
import MainSection from './components/MainSection/MainSection'
import CartGoods from './components/CartGoods/CartGoods'
import Footer from './components/Footer/Footer'
import Filter from './components/Filter/Filter'
import Cover from './components/Cover/Cover'
import Modal from './components/Modal/Modal'


function App() {

    const [goodsInCart, setGoodsInCart] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [showCartGoods, setShowCartGoods] = useState(false)
    const [showFiltration, setShowFiltration] = useState(false)
    const [categories, setCategories] = useState({})
    const [filters, setFilters] = useState([])
    const [showModal, setShowModal] = useState(false)

    const addGoodToCart = (good) => {
        const lighterObj = {name: good.name, image: good.image, price: good.price, id: good.id}
        setTotalPrice(prevPrice => prevPrice + +good.price)
        setGoodsInCart(prevArr => [...prevArr, lighterObj])
    }

    const removeGoodFromCart = (goodInd, goodPrice) => {
        setTotalPrice(prevPrice => prevPrice - +goodPrice)
        setGoodsInCart(prev => [
            ...prev.slice(0, goodInd),
            ...prev.slice(goodInd + 1)
        ]);
    }

    return (
        <>
            <Modal 
                render={showModal} 
                setShowModal={setShowModal}
                goodsInCart={goodsInCart}
                totalPrice={totalPrice}
                setGoodsInCart={setGoodsInCart}
                setTotalPrice={setTotalPrice}
            />
            <Cover render={showFiltration || showModal}/>
            <Filter 
                render={showFiltration} 
                onShowFiltration={setShowFiltration}
                categories={categories}
                onFiltersChange={setFilters}
            />
            <Header 
                goodCount={goodsInCart.length}
                onCartShow={setShowCartGoods}
                onFilterShow={setShowFiltration}
            />
            <div className="container">
                <h2 className="app__header">
                    Nasze produkty
                </h2>
            </div>
            <MainSection 
                onGoodsSet={addGoodToCart}
                onCategoriesChange={setCategories}
                filters={filters}
            />
            <CartGoods 
                show={showCartGoods} 
                onCartShow={setShowCartGoods}
                goods={goodsInCart}
                onGoodRemove={removeGoodFromCart}
                total={totalPrice}
                onShowedForm={setShowModal}
            />
            <Footer/>
        </>
    )
}

export default App
