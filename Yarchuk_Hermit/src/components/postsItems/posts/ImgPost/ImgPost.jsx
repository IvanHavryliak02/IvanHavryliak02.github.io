import './ImgPost.sass'

import Terms from '../Terms/Terms'

export default function ImgPost({data}) {
    return (
        <article className="img-post">
            <h2 className="img-post__title">
                {data.title}
            </h2>
            <div className="grid__img-post">
                <img src={data.imgs[0].photo} alt={data.imgs[0].alt} className="img-post__img" />
                <p className="img-post__main-text">
                    {data.primText}
                </p>
                <p className="img-post__additional-text">
                    {data.secText}
                </p>
            </div>
            {data.terms ? <Terms data={data.terms}/> : null}
        </article>
    )
}