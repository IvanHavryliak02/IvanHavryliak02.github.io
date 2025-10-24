import styled from "styled-components";

const MainHeaderEl = styled.h1`
    font-weight: 700;
    font-size: 40px;
    color: #fff;
    text-align: center;
    
    margin-top: ${({$margt}) => $margt}px;
`

export default function MainHeader({children, margt}) {
    return (
        <MainHeaderEl $margt={margt}>{children}</MainHeaderEl>
    )
}