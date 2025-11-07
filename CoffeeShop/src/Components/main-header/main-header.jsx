import styled from "styled-components";
import { media } from '../../utils/media'

const MainHeaderEl = styled.h1`
    font-weight: 700;
    font-size: 40px;
    color: #fff;
    text-align: center;
    
    margin-top: ${({$margt}) => $margt}px;

    ${media.tablet`
        font-size: 34px;    
    `}


`

export default function MainHeader({children, margt}) {
    return (
        <MainHeaderEl $margt={margt}>{children}</MainHeaderEl>
    )
}