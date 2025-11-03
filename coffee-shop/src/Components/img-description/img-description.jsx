import styled from "styled-components";

import DescriptionBlock from "../description-block/description-block";

const ImgDescriptionEl = styled.div`
    display: grid;
    gap: ${({$stateIsCoffeeDesc}) => $stateIsCoffeeDesc ? '0 55px' : '0 80px'};
    grid-template: 1fr / ${({$stateIsCoffeeDesc}) => $stateIsCoffeeDesc ? '392px 420px' : '272px 346px'};
    justify-content: center;
`

const ImgWrap = styled.div`
    width: 100%;
    height: 100%;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        box-shadow: 5px 5px 30px 0 rgba(0, 0, 0, 0.25);
    }
`

export default function ImgDescription({img, title, paragraphs, appState}) {
    const stateIsCoffeeDesc = appState === 'coffeeDesc';

    return (
        <ImgDescriptionEl $stateIsCoffeeDesc={stateIsCoffeeDesc}>
            <ImgWrap>
                <img src={img.src} alt={img.alt} />
            </ImgWrap>
            <DescriptionBlock
                title={title}
                paragraphs={paragraphs}
                appState={appState}
            />
        </ImgDescriptionEl>
    )
}