import styled from "styled-components";
import { media } from '../../utils/media'
import DescriptionBlock from "../description-block/description-block";

const ImgDescriptionEl = styled.div`
    display: grid;
    gap: ${({$stateIsCoffeeDesc}) => $stateIsCoffeeDesc ? '0 55px' : '0 80px'};
    grid-template: 1fr / ${({$stateIsCoffeeDesc}) => $stateIsCoffeeDesc ? '392px 420px' : '272px 346px'};
    justify-content: center;

    ${media.laptop`
        grid-template: 1fr / ${({$stateIsCoffeeDesc}) => $stateIsCoffeeDesc ? '340px 310px' : '272px 346px'};
        gap: ${({$stateIsCoffeeDesc}) => $stateIsCoffeeDesc ? '0 55px' : '0 50px'}; 
    `}

    ${media.tablet`
        grid-template: ${({$stateIsCoffeeDesc}) => $stateIsCoffeeDesc ? 'auto auto' : 'auto auto'} / 272px ;
        gap: ${({$stateIsCoffeeDesc}) => $stateIsCoffeeDesc ? '50px 0' : '50px 0'}; 
    `}
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