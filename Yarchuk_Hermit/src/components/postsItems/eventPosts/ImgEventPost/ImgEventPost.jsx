import './ImgEventPost.sass'

import DeadlineItem from './../DeadlineItem/DeadlineItem'
import DateOfPost from './../../DateOfPost/DateOfPost'

export default function ImgEventPost({data}) {
    return (
        <article className="img-event-post">
            <h2 className="img-event-post__title">
                {data.title}
            </h2>
            <div className="grid__img-event-post">
                <div className="img-event-post__img">
                    <img src={data.imgs[0].photo} alt={data.imgs[0].alt} />
                </div>
                <p className="img-event-post__main-text">
                    {data.primText}
                </p>
                <DeadlineItem eventData = {data.eventData}/>
            </div>
            <DateOfPost date={data.date}/>
        </article>
    )
}