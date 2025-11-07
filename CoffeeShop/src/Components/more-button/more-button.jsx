import styled from 'styled-components'

const MoreButtonEl = styled.button`
    width: 120px;
    height: 30px;
    background: transparent;
    border: 1px solid #fff;
    color: #fff;
    font-size: 14px;
    margin: 0 auto;
    margin-top: 20px;
    border-radius: 3px;
    transition: 0.5s all;
    cursor: pointer;
    font-weight: bold;
    &:hover {
        background: #fff;
        color: #000;
    }

    display: ${({$hide}) => $hide ? 'none' : 'block'};
`

export default function MoreButton({children, hide, changeAppState}) {
    return (
        <MoreButtonEl onClick={() => changeAppState('ourCoffee')} $hide={hide}>{children}</MoreButtonEl>
    )
}