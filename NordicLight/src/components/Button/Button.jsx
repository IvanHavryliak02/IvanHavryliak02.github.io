import './Button.sass'
import styled from "styled-components";

export default function Button({children, onClickHandler, color, styles}) {

    const brd = color === 'gray' ? '#838383' : '#8ab822'
    const clr = color === 'gray' ? '#676767' : '#649200'
    const hvrBg = color === 'gray' ? '#cdcccc' : '#D6ECA7'
    const hvrClr = color === 'gray' ? '#474747' : '#435c13'

    const Button = styled.button`
        border: 1px solid ${brd};
        color: ${clr};

        &:hover {
            background: ${hvrBg};
            color: ${hvrClr};
        }
    `;

    return (
        <Button
            styles={styles}  
            className="button"
            onClick={onClickHandler}
        >
            {children}
        </Button>
    )
}