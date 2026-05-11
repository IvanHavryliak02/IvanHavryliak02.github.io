import './DateOfPost.sass'

export default function DateOfPost({date}) {
    return (
        <div className="date-of-post">
            Від: {date}
        </div>
    )
}