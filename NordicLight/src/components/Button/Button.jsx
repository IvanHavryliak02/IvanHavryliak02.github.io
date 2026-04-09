import './Button.sass'
import styled from "styled-components";
import { useState, useRef } from 'react';

const StyledButton = styled.button`
    border: 1px solid ${props => props.$brd};
    color: ${props => props.$clr};

    &:hover {
        background: ${props => props.$hvrBg};
        color: ${props => props.$hvrClr};
    }
`;

export default function Button({children, onClickHandler, color, style, type, disabled, buy}) {

    const brd = color === 'gray' ? '#838383' : '#8ab822'
    const clr = color === 'gray' ? '#676767' : '#649200'
    const hvrBg = color === 'gray' ? '#cdcccc' : '#D6ECA7'
    const hvrClr = color === 'gray' ? '#474747' : '#435c13'

    const [bubbles, setBubbles] = useState([])

    const idRef = useRef(0);

    const handleClick = () => {
        const id = idRef.current++;

        setBubbles((prev) => [...prev, { id }]);

        setTimeout(() => {
            setBubbles((prev) => prev.filter((b) => b.id !== id));
        }, 1500);
    };

    return (
        
        <>
            <StyledButton
                $brd={brd}
                $clr={clr}
                $hvrBg={hvrBg}
                $hvrClr={hvrClr}
                style={style}  
                className="button"
                onClick={() => {
                    onClickHandler()
                    if(buy) {
                        handleClick()
                    }
                }}
                type={type}
                disabled={disabled}
            >
                {children}
            </StyledButton>
            {bubbles.map((b) => (
                <span key={b.id} className="bubble">
                    +1
                </span>
            ))}
        </>
        
    )
}