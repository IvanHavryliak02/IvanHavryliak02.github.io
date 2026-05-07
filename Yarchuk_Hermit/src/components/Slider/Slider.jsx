import './Slider.sass'
import { useState } from 'react'
import { nanoid } from 'nanoid'

import arrow from './img/chevron.svg'

export default function Slider({photos, style}) {

    const [slideIndex, setSlideIndex] = useState(0)

    const slideToShow = slideIndex / photos.length

    const createSlides = (photos) => {
        return photos.map((photoObj) => {
            return (
                <div key={nanoid()} className="slider__photo-container">
                    <img src={photoObj.photo} alt={photoObj.alt}/>
                </div>
            )
        })
    }

    const changeSlide = (step) => {
        if(step < 0){
            if(slideIndex > 0){
                setSlideIndex(slideIndex => slideIndex + step)
            }
        }else if(step > 0){
            if(slideIndex < photos.length - 1){
                setSlideIndex(slideIndex => slideIndex + step)
            }
        }
    }

    return (
        <div className="slider" style={style}>
            <button className="slider__back" onClick={() => {changeSlide(-1)}}>
                <img src={arrow} alt="Кнопка для перегортання фото вправо" />
            </button>
            <div className="slider__window">
                <div style={{transform: `translateX(-${slideToShow * 100}%)`}} className="slider__track">
                    {createSlides(photos)}
                </div>
            </div>
            <button className="slider__forward" onClick={() => {changeSlide(1)}}>
                <img src={arrow} alt="Кнопка для перегортання фото вліво" />
            </button>            
        </div>
    )
}