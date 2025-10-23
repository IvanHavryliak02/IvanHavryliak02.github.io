import { Component } from "react";
import styled from "styled-components";
import Header from "../header/header";
import Container from "../../Components/container/container"
import MainHeader from "../../Components/main-header/main-header";
import BeansDivider from "../../Components/beans-divider/beans-divider";
import SubHeader from "../../Components/sub-header/sub-header";
import MoreButton from "../../Components/more-button/more-button";
import mainBg from './main-bg.png'

const TitleSectionEl = styled.section`
    min-height: 640px;
    padding: 30px 0 0 0;
    background: url(${mainBg}) center / cover no-repeat;
`

export default class MainSection extends Component {

    render() {
        return(
            <TitleSectionEl>
                <Container>
                    <Header/>
                    <MainHeader>Everything You Love About Coffee</MainHeader>
                    <BeansDivider/>
                    <SubHeader margt={35}>We makes every day full of energy and taste</SubHeader>
                    <SubHeader margt={20}>Want to try our beans?</SubHeader>
                    <MoreButton>More</MoreButton>
                </Container>
            </TitleSectionEl>
        )
    }
}