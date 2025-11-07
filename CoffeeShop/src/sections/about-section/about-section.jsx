import styled from "styled-components";

import Container from "../../Components/container/container";
import DescriptionBlock from "../../Components/description-block/description-block";

const AboutSectionEl = styled.section`
    min-height: 520px;
    background: #fff;
    padding: 80px 0 100px 0;
    display: ${({$hideSection}) => $hideSection ? 'none' : 'block'}
`

const TextWrap = styled.div`
    height: 100%;
    max-width: 590px;
    margin: 0 auto;
`
export default function AboutSection({appState}) {
    const hideSection = appState !== 'primary';
    return (

        <AboutSectionEl $hideSection = {hideSection}>
            <Container>
                <TextWrap>
                    <DescriptionBlock 
                        title = {'About us'}
                        paragraphs = {[
                            `Extremity sweetness difficult behaviour he of. On disposal of as landlord horrible.
                            Afraid at highly months do things on at. Situation recommend objection do intention
                            so questions. As greatly removed calling pleased improve an. Last ask him cold feel
                            met spot shy want. Children me laughing we prospect answered followed. At it went
                            is song that held help face.`,
                            `Now residence dashwoods she excellent you. Shade being under his bed her, Much
                            read on as draw. Blessing for ignorant exercise any yourself unpacked. Pleasant
                            horrible but confined day end marriage. Eagerness furniture set preserved far
                            recommend. Did even but nor are most gave hope. Secure active living depend son
                            repair day ladies now.`
                        ]}
                    />
                </TextWrap>
            </Container>
        </AboutSectionEl>
    )
}