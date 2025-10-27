import styled from "styled-components";
import womenDrinkCoffeeImg from './women-drink-coffee.png'
import DescriptionBlock from "../description-block/description-block";

const ImgDescriptionEl = styled.div`
    display: grid;
    gap: 0 50px;
    grid-template: 1fr / minmax(272px, 400px) 346px;
    margin: 0 auto;
    max-width: 865px
`

const ImgWrap = styled.div`
    width: 400px;
    height: 355px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background-color: transparent; 
    img {
        max-width: 100%;
        max-height: 100%;
        box-shadow: 5px 5px 30px 0 rgba(0, 0, 0, 0.25);
    }
`

export default function ImgDescription(img, description) {
    return (
        <ImgDescriptionEl>
            <ImgWrap>
                <img src={womenDrinkCoffeeImg} alt="women drinks coffee" />
            </ImgWrap>
            <DescriptionBlock
                title={'About our beans'}
                paragraphs={[
                    `Extremity sweetness difficult behaviour he of. On disposal of as landlord horrible.`,
                    `Afraid at highly months do things on at. `,
                    `Situation recommend objection do intention
                    so questions. `,
                    `As greatly removed calling pleased improve an. Last ask him cold feel`,
                    `met spot shy want. Children me laughing we `,
                    `prospect answered followed. At it went`,
                    `is song that held help face.`
                ]}
            />
        </ImgDescriptionEl>
    )
}