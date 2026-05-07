import './ImgEventPost.sass'

import img from './img/video.png'

import DeadlineItem from './../DeadlineItem/DeadlineItem'

export default function ImgEventPost({eventData}) {
    return (
        <article className="img-event-post">
            <h2 className="img-event-post__title">
                ПУЛЬС ДОРОГИ: ФЕСТИВАЛЬ РУХОМОГО КІНО
            </h2>
            <div className="grid__img-event-post">
                <div className="img-event-post__img">
                    <img src={img} alt="Ярослав у студії на мотоциклі" />
                </div>
                <p className="img-event-post__main-text">
                    Справжня свобода не потребує сценарію, але вона завжди виглядає як ідеально вибудований кадр. Коли ти виходиш на трасу, світ навколо перестає бути просто декорацією — він стає живою стрічкою, де кожен оберт двигуна відбиває ритм монтажної склейки. Для байкера шлях — це процес, для кіношника — це візія. А на перетині цих світів 
                </p>
                <DeadlineItem 
                    eventData = {eventData}/>
            </div>
        </article>
    )
}