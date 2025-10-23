
import styled from 'styled-components';
import lightLiImg from './light-beans.png'
import darkLiImg from './dark-beans.png'

const NavMenuEl = styled.nav`
    height: 100%;
    ul {
        li {
            &:first-child {
                &::before {
                    background: url(${({$type}) => $type === 'dark' ? darkLiImg : lightLiImg }) center / cover no-repeat;
                }
            }
            &::after {
                background: ${({$type}) => $type === 'dark' ? '#000' : '#fff' };
            }
            button {
                color: ${({$type}) => $type === 'dark' ? '#000' : '#fff' };
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
    position: relative;
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
    &::after {
        content: '';
        width: 0;
        height: 2px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: -5px;
        transition: 0.3s width;
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
    }
`

export default function NavMenu({type}) {
    
    return (
        <NavMenuEl $type={type}>
            <UnList>
                <ListItem><button>Coffee house</button></ListItem>
                <ListItem><button>Our coffee</button></ListItem>
                <ListItem><button>For your pleasure</button></ListItem>
            </UnList>
        </NavMenuEl>
        
    )
} 