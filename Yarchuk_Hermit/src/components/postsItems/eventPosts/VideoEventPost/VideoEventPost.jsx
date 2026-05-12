import './VideoEventPost.sass'
import DeadlineItem from './../DeadlineItem/DeadlineItem'

import DateOfPost from './../../DateOfPost/DateOfPost'

export default function VideoEventPost({data}){
    

    return (
        <article className="video-event-post">
            <h2 className="video-event-post__title">
                {data.title}
            </h2>
            <div className="grid__video-event-post">
                <div className="video-event-post__img">
                    <img src={data.video} alt="Ярослав у студії на мотоциклі" />
                </div>
                <p className="video-event-post__main-text">
                    {data.primText}
                </p>
                <DeadlineItem eventData={data.eventData}/>
            </div>
            <DateOfPost data={data}/>
        </article>
    )
} 