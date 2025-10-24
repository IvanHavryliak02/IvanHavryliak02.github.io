import styled from 'styled-components'
import BeansDivider from '../../Components/beans-divider/beans-divider'
import NavMenu from '../../Components/nav-menu/nav-menu'

const FooterEl = styled.footer`
    background: #fff;
    padding: 30px 0 20px 0;
    min-height: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export default function Footer({changeAppState}) {
    return (
        <FooterEl>
            <NavMenu changeAppState={changeAppState} type={'dark'}/>
            <BeansDivider type={'dark'}/>
        </FooterEl>
    )
}