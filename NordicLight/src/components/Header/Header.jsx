import './Header.sass'
import blub from './../../icons/blub.svg'
import Cart from '../Cart/Cart'

export default function Header({goodCount, onCartShow}) {
    return (
        <header className='header'>
            <div className="container">
                <div className="header__wrap">
                    <a href="" className="header__logo">
                        <span className='header__logo-text'>Nordic Świat</span>
                        <div className="header__logo-container">
                            <img src={blub} alt="blub" className="header__ico"/>
                        </div>
                    </a>

                    <nav className='header__menu'>
                        <ul>
                            <li onClick={() => {onCartShow(true)}}>
                                <a href="#" className="header__link">
                                    <Cart goodCount={goodCount}/>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}