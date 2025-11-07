import styled from 'styled-components'
import { media } from '../../utils/media'

import BeansDivider from '../../Components/beans-divider/beans-divider'
import NavMenu from '../../Components/nav-menu/nav-menu'

const FooterEl = styled.footer`
    background: #fff;
    padding: 30px 0 20px 0;
    min-height: 150px;
    display: flex; 
    flex-direction: column;
    align-items: center;
    position: relative;

    ${media.mobile`
        min-height: 180px    
    `}
`

export default function Footer({changeAppState}) {
    return (
        <FooterEl>
            <NavMenu changeAppState={changeAppState} type={'dark'}/>
            <BeansDivider type={'dark'} selector='footer_divider'/>
        </FooterEl>
    )
}