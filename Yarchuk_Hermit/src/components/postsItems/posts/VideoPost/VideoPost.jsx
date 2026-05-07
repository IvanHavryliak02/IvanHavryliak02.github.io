import './VideoPost.sass'

import Terms from '../Terms/Terms'

export default function VideoPost({data}){
    return (
        <article className="video-post">
            <h2 className="video-post__title">
                {data.title}
            </h2>
            <div className="grid__video-post">
                <img src={data.video} alt="відео" className="video-post__img" />
                <p className="video-post__main-text">
                    {data.primText}
                </p>
                <p className="video-post__additional-text">
                    {data.secText}
                </p>
            </div>
            {data.terms ? <Terms data={data.terms}/> : null}
        </article>
    )
}