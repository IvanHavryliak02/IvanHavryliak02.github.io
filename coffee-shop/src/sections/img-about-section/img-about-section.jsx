import styled from "styled-components";

import Container from '../../Components/container/container'
import ImgDescription from "../../Components/img-description/img-description";

const ImgAboutSectionEl = styled.section`
    min-height: 485px;
    padding: 70px 0 60px 0;
    background: #fff;
    position: relative;
    display: ${({$hideSection}) => $hideSection ? 'none' : 'block'}
`

const Divider = styled.div`
    width: 240px;
    height: 1px;
    background: #000;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
`

export default function ImgAboutSection({appState}){
    const hideSection = appState !== 'ourCoffee'
    return (
        <ImgAboutSectionEl $hideSection={hideSection}>
            <Container>
                <ImgDescription/>
            </Container>
            <Divider/>
        </ImgAboutSectionEl>
    )
}