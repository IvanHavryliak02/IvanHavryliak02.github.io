import './DeadlineItem.sass'

import Button from './../../../Buttons/ActionButton/ActionButton'

export default function DeadlineItem({eventData}) {

    const {location, eventDate, deadline} = eventData

    const checkDeadline = (eventData) => {
        const {location, eventDate, deadline} = eventData
        const [day, month, year] = deadline.split('.').map(str => +str)

        const ISODeadline = new Date(year, month - 1, day)
        const now = new Date()

        return now < ISODeadline
    }
    return (
        <div className="deadline">
            {checkDeadline(eventData) ? <DeadlineNotExpired eventDate={eventDate}/> : <DeadlineExpired/>}
        </div>
    )
}

const DeadlineNotExpired = ({location, eventDate, deadline}) => {
    return (
        <>
            <div className="deadline__group">
                <div className="deadline__text">Місце зустрічі: <span>{location}</span> </div>
                <div className="deadline__text">Подія запланована на <span>{eventDate}</span> </div>
                <div className="deadline__text">Запис доступний до <span>{deadline}</span></div>
            </div>
            <Button className='deadline_btn'>Записатися</Button>
        </>
    )
}

const DeadlineExpired = () => {
    return (
        <span className="deadline__expired">
            Нажаль записи більше не приймаються
        </span>
    )
}