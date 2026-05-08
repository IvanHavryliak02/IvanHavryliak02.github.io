import './DeadlineItem.sass'

import Button from './../../../Buttons/ActionButton/ActionButton'

export default function DeadlineItem({eventData}) {

    if(!eventData) return null

    const {location, eventDate, deadline} = eventData

    const checkDeadline = (eventData) => {
        const {deadline} = eventData
        const [day, month, year] = deadline.split('.').map(str => +str)

        const ISODeadline = new Date(year, month - 1, day)
        const now = new Date()

        if(now < ISODeadline){
            return [true, '']
        }else {
            return [false, 'deadline_expired']
        }
    }

    const deadlineData = checkDeadline(eventData);
    return (
        <div className={`deadline ${deadlineData[1]}`}>
            {deadlineData[0] ? <DeadlineNotExpired data={eventData}/> : <DeadlineExpired/>}
        </div>
    )
}

const DeadlineNotExpired = ({data}) => {
    const {location, eventDate, deadline} = data
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