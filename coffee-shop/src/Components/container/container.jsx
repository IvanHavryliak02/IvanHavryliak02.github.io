import styled from "styled-components"

const ContainerEl = styled.div`
    width: 1140px;
    margin: 0 auto;
`

export default function Container({children}) {
    return (
        <ContainerEl>{children}</ContainerEl>
    )
}