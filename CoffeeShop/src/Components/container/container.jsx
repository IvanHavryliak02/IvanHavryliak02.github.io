import styled from "styled-components"
import { media } from "../../utils/media"

const ContainerEl = styled.div`
    max-width: 1140px;
    margin: 0 auto;

    ${media.desktop`
        max-width: 960px;    
    `}

    ${media.laptop`
        max-width: 720px;    
    `}

    ${media.tablet`
        max-width: 540px;   
    `}

    ${media.mobile`
        max-width: 100%;
        padding: 0 10px 0 10px;    
    `}
`

export default function Container({children}) {
    return (
        <ContainerEl>{children}</ContainerEl>
    )
}