import './GalleryPost.sass'

import img1 from './img/img1.jpg'
import img2 from './img/img2.jpg'
import img3 from './img/img3.jpg'

import Slider from './../../../Slider/Slider'

export default function GalleryPost() {
    return (
        <article className="gall-post">
            <h2 className="gall-post__title">
                КАДР НА ШВИДКОСТІ: КОНКУРС ДЛЯ ТИХ, ХТО БАЧИТЬ ДРАЙВ
            </h2>
            <Slider photos={[img1, img2, img3]} style={{marginTop: '30px'}}/>
        </article>
    )
}