import './FilmPost.sass'

import DateOfPost from './../DateOfPost/DateOfPost'

export default function Film({data}) {

    const secText = data.secText ? data.secText : ''

    return (
        <article className="film-post">
            <h2 className="film-post__title">
                {data.title}
            </h2>
            <div className="grid__film-post">
                <p className="film-post__main-text">
                    {data.primText} 
                </p>
                <img src={data.video} alt="Ярослав у студії на мотоциклі" className="film-post__img" />
                {secText ? <p className="film-post__additional-text">
                    {secText} 
                </p> : null}
            </div>
            <DateOfPost data={data}/>
        </article>
    )
}