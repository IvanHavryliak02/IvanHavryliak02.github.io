import { Component } from "react";
import styled from 'styled-components';
import NavMenu from "../../Components/nav-menu/nav-menu";

const HeaderEl = styled.header`
    width: 100%;
`

export default class Header extends Component {
    
    render() {
        return (
            <HeaderEl>
                <NavMenu/>
            </HeaderEl>
        )
    }
} 