import styled from 'styled-components'

const SubHeaderEl = styled.h2`
    font-weight: 700;
    font-size: 24px;
    color: #fff;
    margin-top: ${({$mt}) => $mt ? $mt : 0}px;
    margin-bottom: ${({$mb}) => $mb ? $mb : 0}px;
    text-align: center;
`

export default function SubHeader({children, margt, margb}) {
    return (
        <SubHeaderEl $mt={margt} $mb={margb}>{children}</SubHeaderEl>
    )
}