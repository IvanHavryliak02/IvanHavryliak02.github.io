import './Terms.sass'

import liIco from './ico/list_decoration.svg'
import { nanoid } from 'nanoid'

export default function Terms({data}) {

    const createList = (data) => {
        return data.map(obj => {
            return (
                <li key={nanoid()}>
                    <span>{obj.title}:</span>{obj.descr}
                    <div className="terms__img">
                        <img src={liIco} alt="іконка колеса - прикраса елементу списку" />
                    </div>
                </li>
            )
        })
    }
    
    return (
        <div className="terms">
            <h3 className="terms__title">
                Умови конкурсу
            </h3>
            <ul className="terms__list">
                {createList(data)}
            </ul>
        </div>
    )
}