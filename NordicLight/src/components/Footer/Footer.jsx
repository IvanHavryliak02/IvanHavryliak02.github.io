import './Footer.sass'
import Logo from '../Logo/Logo'

export default function Footer() {

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__wrap">
                    <div className="footer__logo-container">
                        <Logo white={true}/>
                    </div>
                    <div className="footer__link-container">
                        <ul className="footer__links">
                            <li className="footer__link"><a href="#">Pomoc</a></li>
                            <li className="footer__link"><a href="#">O nas</a></li>
                            <li className="footer__link"><a href="#">Kontakt</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}