import './GalleryEventPost.sass'

import DeadlineItem from './../DeadlineItem/DeadlineItem'
import Slider from '../../../Slider/Slider'
import DateOfPost from './../../DateOfPost/DateOfPost'

export default function GalleryEventPost({data}){
    return (
        <article className="gallery-event-post">
            <h2 className="gallery-event-post__title">
                {data.title}
            </h2>
            <div className="grid__gallery-event-post">
                <div className="gallery-event-post__container">
                    <Slider photos={data.imgs}/>
                </div>
                <p className="gallery-event-post__main-text">
                    {data.primText}
                </p>
            </div>
            <DeadlineItem eventData={data.eventData}/>
            <DateOfPost data={data}/>
        </article>
    )
}