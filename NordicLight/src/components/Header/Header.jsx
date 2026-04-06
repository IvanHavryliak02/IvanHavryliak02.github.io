import './Header.sass'

import Cart from '../Cart/Cart'

import Logo from '../Logo/Logo'

export default function Header({goodCount, onCartShow}) {
    return (
        <header className='header'>
            <div className="container">
                <div className="header__wrap">
                    <Logo/>
                    <nav className='header__menu'>
                        <ul>
                            <li><a href="#" className="header__link">Filtruj</a></li>
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