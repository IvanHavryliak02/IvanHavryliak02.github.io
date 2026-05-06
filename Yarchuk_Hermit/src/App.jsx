import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import ScrollToTop from './utils/ScrollToTop/ScrollToTop'
import './App.sass'

import Header from './components/Header/Header'
import MainPage from './pages/MainPage/MainPage'
import Blog from './pages/Blog/Blog'
import Contact from './pages/Contact/Contact'
import Footer from './components/Footer/Footer'

function App() {

    return (
        <>
            <ScrollToTop/>
            <Header/>
            <main className="main-content">
                <Routes>
                    <Route path='/home' element={ <MainPage/> }/>
                    <Route path='/blog' element={ <Blog/> }/>
                    <Route path='/contact' element={ <Contact/> }/>
                </Routes>
            </main>
            <Footer/>
        </>
    )
}

export default App
