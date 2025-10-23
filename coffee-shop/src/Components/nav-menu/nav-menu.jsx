
import styled from 'styled-components';
import lightLiImg from './light-beans.png'
import darkLiImg from './dark-beans.png'

const NavMenuEl = styled.nav`
    height: 100%;
    ul {
        li {
            color: ${({$type}) => $type === 'dark' ? '#000' : '#fff' };
            &:first-child {
                &::before {
                    background: url(${({$type}) => $type === 'dark' ? darkLiImg : lightLiImg }) center / cover no-repeat;
                }
            }
        }
    }
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
            position: absolute;
            left: -30px;
            bottom: 0;
        };  
    };
`

export default function NavMenu({type}) {
    
    return (
        <NavMenuEl $type={type}>
            <UnList>
                <ListItem>Coffee house</ListItem>
                <ListItem>Our coffee</ListItem>
                <ListItem>For your pleasure</ListItem>
            </UnList>
        </NavMenuEl>
        
    )
} 