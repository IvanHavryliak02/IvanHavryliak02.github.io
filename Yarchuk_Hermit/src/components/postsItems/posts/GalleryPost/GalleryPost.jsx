import './GalleryPost.sass'

import Slider from './../../../Slider/Slider'
import Terms from '../Terms/Terms'
import DateOfPost from './../../DateOfPost/DateOfPost'
import Pin from './../Pin/Pin'

export default function GalleryPost({data}) {
    return (
        <article className="gallery-post">
            {data.pinned && <Pin/>}
            <h2 className="gallery-post__title">
                {data.title}
            </h2>
            <div className="grid__gallery-post">
                <div className="gallery-post__container">
                    <Slider photos={data.imgs}/>
                </div>
                <p className="gallery-post__main-text">
                    {data.primText}
                </p>
            </div>
            <Terms data={data.terms}/>
            <DateOfPost date={data.date}/>
        </article>
    )
}