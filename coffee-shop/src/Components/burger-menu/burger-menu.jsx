import { Component } from "react";
import styled from "styled-components";
import { media } from '../../utils/media'
import NavMenu from "../nav-menu/nav-menu";

const BurgerMenuEl = styled.div`
    padding: 60px 10px 30px 10px;
    position: fixed;
    z-index: 1000;
    width: 220px;
    height: 100vh;
    top: 0;
    left: 0;
    transform: translateX(${({$shown}) => $shown ? '0' : '-100%'});
    transition: 0.5s transform ease-out; 
    display: none;
    background: rgba(0,0,0,0.8);
    .burger_nav {
        ul {
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
            height: auto;
            li {
                height: 40px;
                display: flex;
                align-items: center;
            }
        }
    }
    ${media.mobile`
        display: block;    
    `}
`

const BurgerTrigger = styled.button`
    width: 32px;
    height: 20px;
    border: none;
    background: transparent;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    right: -52px;
    top: 20px;
    div.line {
        width: 100%;
        height: 2px;
        background: #ffbe00;
    }

    ${({$shown}) => $shown ? `
        div.line:first-child {
            position: absolute;
            top: 50%;
            transform: rotate(45deg);
        }
        div.line:last-child {
            position: absolute;
            top: 50%;
            transform: rotate(-45deg);
        }
        div.line:nth-child(2) {
            display: none;
        }
    ` : ``}
`

export default class BurgerMenu extends Component {

    state = {
        shown: false
    }

    onShownChange = () => {
        this.setState(state => ({shown: !state.shown}))
    }

    render() {

        const changeAppState = this.props.changeAppState;
        return (
            <BurgerMenuEl $shown={this.state.shown}>
                <NavMenu selector="burger_nav" changeAppState={changeAppState}/>
                <BurgerTrigger $shown={this.state.shown} onClick={this.onShownChange}>
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                </BurgerTrigger>
            </BurgerMenuEl>
        )
    }
}