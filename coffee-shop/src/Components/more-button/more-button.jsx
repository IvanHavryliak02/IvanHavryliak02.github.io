import styled from 'styled-components'

const MoreButtonEl = styled.button`
    width: 120px;
    height: 30px;
    background: transparent;
    border: 1px solid #fff;
    color: #fff;
    font-size: 14px;
    margin: 0 auto;
    display: block;
    margin-top: 20px;
    border-radius: 3px;
    transition: 0.5s all;
    cursor: pointer;
    &:hover {
        background: #fff;
        color: #000;
    }
`

export default function MoreButton({children}) {
    return (
        <MoreButtonEl>{children}</MoreButtonEl>
    )
}