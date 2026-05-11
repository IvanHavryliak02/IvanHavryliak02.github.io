import './Pin.sass'

import pin from './ico/pin.svg'

export default function Pin() {
    return (
        <div className="pin">
            <img src={pin} alt="Цей пост закріплено автором" />
        </div>
    )
}