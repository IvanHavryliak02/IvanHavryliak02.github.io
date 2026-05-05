import './NavMenu.sass'
import ActionButton from './../Buttons/ActionButton/ActionButton'
import { NavLink } from 'react-router-dom'

export default function NavMenu(){
    return (
        <nav className="menu">
            <ul className="menu__items">
                <li className="menu__item">
                    <NavLink to="/">
                        головна
                    </NavLink>
                </li>
                <li className="menu__item">
                    <NavLink to="/blog">
                        Новини
                    </NavLink>
                </li>
                <li className="menu__item">
                    <NavLink to="/contact">
                        Контакт
                    </NavLink>
                </li>
                <li className="menu__item">
                    <ActionButton>підписатися</ActionButton>
                </li>
            </ul>
        </nav>
    )
}