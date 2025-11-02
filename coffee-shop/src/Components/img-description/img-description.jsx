import styled from "styled-components";

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

export default function ImgDescription({img, title, paragraphs, appState}) {
    return (
        <ImgDescriptionEl>
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