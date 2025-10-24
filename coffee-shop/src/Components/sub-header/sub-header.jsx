import styled from 'styled-components'

const SubHeaderEl = styled.h2`
    font-weight: 700;
    font-size: 24px;
    text-align: center;

    color: ${({$type}) => $type === 'dark' ? '#000' : '#fff'};
    margin-top: ${({$mt}) => $mt ? $mt : 0}px;
    margin-bottom: ${({$mb}) => $mb ? $mb : 0}px;
    display: ${({$hide}) => $hide ? 'none' : 'block'};
`

export default function SubHeader({children, margt, margb, type, hide}) {
    return (
        <SubHeaderEl $hide={hide} $mt={margt} $mb={margb} $type={type}>{children}</SubHeaderEl>
    )
}