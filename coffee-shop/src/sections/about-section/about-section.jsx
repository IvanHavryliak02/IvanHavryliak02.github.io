import styled from "styled-components";

import Container from "../../Components/container/container";
import DescriptionBlock from "../../Components/description-block/description-block";

const AboutSectionEl = styled.section`
    min-height: 520px;
    background: #fff;
    padding: 80px 0 100px 0;
`

export default function AboutSection() {

    return (
        <AboutSectionEl>
            <Container>
                <DescriptionBlock/>
            </Container>
        </AboutSectionEl>
    )
}