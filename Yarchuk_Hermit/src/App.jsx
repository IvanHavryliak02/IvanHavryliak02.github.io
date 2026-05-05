import { useState } from 'react'
import './App.sass'

import Header from './components/Header/Header'
import MainPage from './pages/MainPage/MainPage'
import Footer from './components/Footer/Footer'

function App() {

    return (
        <>
            <Header/>
            <MainPage/>
            <Footer/>
        </>
    )
}

export default App
