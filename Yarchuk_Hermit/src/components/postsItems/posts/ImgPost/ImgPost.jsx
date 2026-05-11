import './ImgPost.sass'

import Terms from '../Terms/Terms'
import DateOfPost from './../../DateOfPost/DateOfPost'
import Pin from './../Pin/Pin'

export default function ImgPost({data}) {

    const secText = data.secText ? data.secText : ''

    return (
        <article className="img-post">
            {data.pinned && <Pin/>}
            <h2 className="img-post__title">
                {data.title}
            </h2>
            <div className="grid__img-post">
                <img src={data.imgs[0].photo} alt={data.imgs[0].alt} className="img-post__img" />
                <p className="img-post__main-text">
                    {data.primText}
                </p>
                {secText ? <p className="img-post__additional-text">
                    {secText} 
                </p> : null}
            </div>
            <Terms data={data.terms}/>
            <DateOfPost date={data.date}/>
        </article>
    )
}