import './GalleryPost.sass'

import Slider from './../../../Slider/Slider'
import Terms from '../Terms/Terms'

export default function GalleryPost({data}) {
    return (
        <article className="gall-post">
            <h2 className="gall-post__title">
                {data.title}
            </h2>
            <Slider photos={data.imgs} style={{marginTop: '65px'}}/>
            <p className="gall-post__main-text">
                {data.primText}
            </p>
            {data.terms ? <Terms data={data.terms}/> : null}
        </article>
    )
}