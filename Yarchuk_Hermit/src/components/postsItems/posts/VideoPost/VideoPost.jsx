import './VideoPost.sass'

import Terms from '../Terms/Terms'

export default function VideoPost({data}){

    const secText = data.secText ? data.secText : ''

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
                {secText ? <p className="video-post__additional-text">
                    {secText} 
                </p> : null}
            </div>
            <Terms data={data.terms}/>
        </article>
    )
}