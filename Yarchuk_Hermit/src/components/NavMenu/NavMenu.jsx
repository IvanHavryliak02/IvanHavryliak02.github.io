import './NavMenu.sass'
import ActionButton from './../Buttons/ActionButton/ActionButton'

export default function NavMenu(){
    return (
        <nav className="menu">
            <ul className="menu__items">
                <li className="menu__item">
                    <a href="#">
                        головна
                    </a>
                </li>
                <li className="menu__item">
                    <a href="#">
                        новини
                    </a>
                </li>
                <li className="menu__item">
                    <a href="#">
                        контакт
                    </a>
                </li>
                <li className="menu__item">
                    <ActionButton>підписатися</ActionButton>
                </li>
            </ul>
        </nav>
    )
}