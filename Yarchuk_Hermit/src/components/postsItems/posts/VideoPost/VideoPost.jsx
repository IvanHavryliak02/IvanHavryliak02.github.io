import './VideoPost.sass'

import Terms from '../Terms/Terms'
import DateOfPost from './../../DateOfPost/DateOfPost'
import Pin from './../Pin/Pin'


export default function VideoPost({data}){

    const secText = data.secText ? data.secText : ''

    return (
        <article className="video-post">
            {data.pinned && <Pin/>}
            <h2 className="video-post__title">
                {data.title}
            </h2>
            <div className="grid__video-post">
                <img src={data.video} alt="відео" className="video-post__img" />
                <p className="video-post__main-text">
                    {data.primText}
                </p>
            </div>
            <Terms data={data.terms}/>
            <DateOfPost data={data}/>
        </article>
    )
}