
import styled from 'styled-components';
import firstLiImg from './light-beans.png'

const NavMenuEl = styled.nav`
    height: 100%;
` 

const UnList = styled.ul`
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
    height: 100%;
    align-items: flex-end;
`

const ListItem = styled.li`
    display: block;
    font-size: 12px;
    color: #ffffff;
    margin-left: 40px;
    &:first-child {
        margin-left: 35px;
    };
    &:first-child {
        position: relative;
        &::before {
            content: '';
            width: 35px;
            height: 35px;
            background: url(${firstLiImg}) center / cover no-repeat;
            position: absolute;
            left: -30px;
            bottom: 0;
        };  
    };
`

export default function NavMenu() {
    
    return (
        <NavMenuEl>
            <UnList>
                <ListItem>Coffee house</ListItem>
                <ListItem>Our coffee</ListItem>
                <ListItem>For your pleasure</ListItem>
            </UnList>
        </NavMenuEl>
        
    )
} 