import { Component } from "react";
import styled from "styled-components";
import Header from "../header/header";
import Container from "../../Components/container/container"
import MainHeader from "../../Components/main-header/main-header";
import BeansDivider from "../../Components/beans-divider/beans-divider";
import SubHeader from "../../Components/sub-header/sub-header";
import MoreButton from "../../Components/more-button/more-button";
import mainBg from './main-bg.png'
import mainBgForPleasure from './for-pleasure.png'
import mainBgOurCoffee from './our-coffee.png'

const TitleSectionEl = styled.section`
    padding: ${({$styleSettings}) => $styleSettings.padding};
    min-height: ${({$styleSettings}) => $styleSettings.minHeight};
    background: url(${({$styleSettings}) => $styleSettings.bgImg}) center / cover no-repeat;
`

export default class MainSection extends Component {

    render() {
        const {appState, changeAppState} = this.props;
        const hide = appState !== 'primary';
        const headerMt = appState !== 'primary' ? 60 : 110;
        const styleSettings = {}
        switch(appState){
            case 'primary': 
                styleSettings.title = 'Everything You Love About Coffee';
                styleSettings.bgImg = mainBg;
                styleSettings.minHeight = '640px';
                styleSettings.padding = '30px 0 0 0';
                break;
            case 'ourCoffee': 
                styleSettings.title = 'Our Coffee';
                styleSettings.bgImg = mainBgOurCoffee;
                styleSettings.minHeight = '260px';
                styleSettings.padding = '30px 0 85px 0';
                break;
            case 'coffeeDesc': 
                styleSettings.title = 'Our Coffee';
                styleSettings.bgImg = mainBgOurCoffee;
                styleSettings.minHeight = '260px';
                styleSettings.padding = '30px 0 85px 0';
                break;
            case 'yourPleasure': 
                styleSettings.title = 'Your Pleasure';
                styleSettings.bgImg = mainBgForPleasure;
                styleSettings.minHeight = '260px';
                styleSettings.padding = '30px 0 85px 0';
                break;
            default: 
                styleSettings.title = 'Everything You Love About Coffee';
                styleSettings.bgImg = mainBg;
                styleSettings.minHeight = '640px';
                styleSettings.padding = '30px 0 0 0';
        }
        return(
            <TitleSectionEl $styleSettings = {styleSettings} $appState = {appState}>
                <Container>
                    <Header changeAppState={changeAppState}/>
                    <MainHeader margt={headerMt}>{styleSettings.title}</MainHeader>
                    <BeansDivider hide={hide}/>
                    <SubHeader hide={hide} margt={35}>We makes every day full of energy and taste</SubHeader>
                    <SubHeader hide={hide} margt={20}>Want to try our beans?</SubHeader>
                    <MoreButton changeAppState={changeAppState} hide={hide}>More</MoreButton>
                </Container>
            </TitleSectionEl>
        )
    }
}