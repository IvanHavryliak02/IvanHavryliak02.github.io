import './GalleryEventPost.sass'

import DeadlineItem from './../DeadlineItem/DeadlineItem'
import Slider from '../../../Slider/Slider'

export default function GalleryEventPost({data}){
    return (
        <article className="gallery-event-post">
            <h2 className="gallery-event-post__title">
                {data.title}
            </h2>
            <Slider photos={data.imgs} style={{marginTop: '65px'}}/>
            <p className="gallery-event-post__main-text">
                {data.primText}
            </p>
            <DeadlineItem eventData={data.eventData}/>
        </article>
    )
}