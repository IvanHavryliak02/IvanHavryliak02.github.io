import './MainPage.sass'

import heroImg from './img/hero.svg'
import videoImg from './img/video.png'


export default function MainPage() {
    return (
        <>
            <section className="main-page__hero-section">
            <div className="main-page__hero-wrapper">
                <img src={heroImg} alt="Yarchuk Hermit" className="main-page__hero"/>
            </div>
            </section>
            <section className="main-page__about-section">
                <div className="container">
                    <div className="main-page__about-wrapper">
                        <div className="grid__about">
                            <div className="main-page__img">
                                <img src={videoImg} alt="about yarchuk video" />
                            </div>
                            <span className="main-page__about-descr">
                                Цей проєкт — синтез двох пристрастей: нескінченного асфальту та магії кінематографа. Я не просто роблю огляди чи знімаю поїздки, я досліджую філософію руху через об’єктив камери та крізь скло шолома. Мій канал — це простір для тих, хто бачить у фільмах не просто картинку, а структуру, і хто відчуває дорогу як найкращий сценарій, написаний самим життям.
                                Ми розбираємо кіно як складний механізм: від операторської роботи та монтажних склейок до глибинних архетипів героїв. Паралельно з цим ми перебуваємо у постійному русі, де кожна подорож стає живим фоном для роздумів про культові стрічки, естетику кадру та вплив попкультури на нашу реальність.
                                
                            </span>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}