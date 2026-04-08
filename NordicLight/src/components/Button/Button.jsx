import './Button.sass'
import styled from "styled-components";

const StyledButton = styled.button`
    border: 1px solid ${props => props.$brd};
    color: ${props => props.$clr};

    &:hover {
        background: ${props => props.$hvrBg};
        color: ${props => props.$hvrClr};
    }
`;

export default function Button({children, onClickHandler, color, style, type, disabled}) {

    const brd = color === 'gray' ? '#838383' : '#8ab822'
    const clr = color === 'gray' ? '#676767' : '#649200'
    const hvrBg = color === 'gray' ? '#cdcccc' : '#D6ECA7'
    const hvrClr = color === 'gray' ? '#474747' : '#435c13'

    return (
        <StyledButton
            $brd={brd}
            $clr={clr}
            $hvrBg={hvrBg}
            $hvrClr={hvrClr}
            style={style}  
            className="button"
            onClick={onClickHandler}
            type={type}
            disabled={disabled}
        >
            {children}
        </StyledButton>
    )
}