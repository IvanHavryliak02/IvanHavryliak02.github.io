import './PodcastPost.sass'

import DateOfPost from './../DateOfPost/DateOfPost'

export default function PodcastPost({data}) {
    return (
        <article className="podcast-post">
            <h2 className="podcast-post__title">
                {data.title}
            </h2>
            <div className="grid__podcast-post">
                <img src={data.video} alt="Ярослав у студії на мотоциклі" className="podcast-post__img"/>
                <p className="podcast-post__main-text">
                    {data.primText}
                </p>
            </div>
            <DateOfPost data={data}/>
        </article>
    )
}