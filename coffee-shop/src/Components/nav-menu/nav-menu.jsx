
import styled from 'styled-components';
import lightLiImg from './light-beans.svg'
import darkLiImg from './dark-beans.svg'
import { media } from '../../utils/media'

const NavMenuEl = styled.nav`
    height: 40px;

    ${media.tablet`
        font-size: 13px;    
    `}

    ${media.mobile`
        &.header_nav {
            display: none;
        }
    `}
` 
const UnList = styled.ul`
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
    height: 100%;
    align-items: flex-end;
    ${media.mobile`
        flex-direction: column;
        align-items: center;    
    `}
`

const ListItem = styled.li`
    display: block;
    font-size: 12px;
    margin-left: 40px;
    position: relative;
    &:first-child {
        margin-left: 35px;
        position: relative;
        &::before {
            content: '';
            width: 35px;
            height: 35px;
            position: absolute;
            left: -32px;
            bottom: 7px;

            background: url(${({$type}) => $type === 'dark' ? darkLiImg : lightLiImg }) center / cover no-repeat;
        }; 
    };
    &::after {
        content: '';
        width: 0;
        height: 2px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: -5px;
        transition: 0.3s width;

        background: ${({$type}) => $type === 'dark' ? '#000' : '#fff' };
    }
    &:hover {
        &::after {
            width: 100%;
        }
    }
    button {
        cursor: pointer;
        background: transparent; 
        border: none;

        color: ${({$type}) => $type === 'dark' ? '#000' : '#fff' };
    }

    ${media.mobile`
        margin-left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 10px;
        &::after {
            display: none
        }
        &:first-child {
            margin-left: 0px;
            &::before {
                display: none
            }
        }
        &:not(:last-child) {
            margin-bottom: 15px;
        }
    `}
`

export default function NavMenu({type, changeAppState, selector = ''}) {

    return (
        <NavMenuEl className={selector}>
            <UnList>
                <ListItem $type={type}><button onClick={() => changeAppState('primary')}>Coffee house</button></ListItem>
                <ListItem $type={type}><button onClick={() => changeAppState('ourCoffee')}>Our coffee</button></ListItem>
                <ListItem $type={type}><button onClick={() => changeAppState('yourPleasure')}>For your pleasure</button></ListItem>
            </UnList>
        </NavMenuEl>
        
    )
} 