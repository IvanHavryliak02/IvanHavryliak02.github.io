import './Footer.sass'

import yhLogo from './img/logo_yh.svg'
import sfLogo from './img/logo_sf.svg'

import instIco from './icons/instagram.svg'
import telegIco from './icons/telegram.svg'
import tikIco from './icons/tiktok.svg'
import ytIco from './icons/youtube.svg'

import NavMenu from './../NavMenu/NavMenu'

export default function Footer(){
    return (
        <footer className="footer">
            <div className="footer__first-logo">
                <img src={sfLogo} alt="street films logo" />
            </div>
            <div className="footer__central">
                <ul className="footer__links">
                    <li className="footer__link">
                        <a href="#">
                            <img src={instIco} alt="footer link icon" className="footer__ico" data-inst />
                        </a>
                    </li>
                    <li className="footer__link">
                        <a href="#">
                            <img src={ytIco} alt="footer link icon" className="footer__ico" data-yt />
                        </a>
                    </li>
                    <li className="footer__link">
                        <a href="#">
                            <img src={telegIco} alt="footer link icon" className="footer__ico" data-teleg />
                        </a>
                    </li>
                    <li className="footer__link">
                        <a href="#">
                            <img src={tikIco} alt="footer link icon" className="footer__ico" data-tiktok/>
                        </a>
                    </li>
                </ul>
                <div className="footer__divider"></div>
                <NavMenu/>
            </div>
            <div className="footer__last-logo">
                <img src={yhLogo} alt="yarchuk hermit logo" />
            </div>
        </footer>
    )
}