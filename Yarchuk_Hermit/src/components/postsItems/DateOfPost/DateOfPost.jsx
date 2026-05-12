import './DateOfPost.sass'

export default function DateOfPost({data}) {

    const {date, video} = data

    const link = <a href="#" className="date-of-post__link">Дивитися на YouTube</a>

    return (
        <div className="date-of-post"> 
            <span>
                Від: {date} {video && ` | `} {video && link}
            </span>
        </div>
    )
}