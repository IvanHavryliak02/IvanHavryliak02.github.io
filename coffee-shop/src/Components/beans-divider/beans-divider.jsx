import styled from "styled-components";
import {media} from "../../utils/media"

import darkBeans from "./dark-beans.svg";
import lightBeans from "./light-beans.svg";


const Divider = styled.div`
    display: ${({$hide}) => $hide ? 'none' : 'block'};
    margin: 0 auto;
    width: 30px;
    height: 30px;
    margin-top: 20px;
    background: url(${({$type})=> $type === 'dark' ? darkBeans : lightBeans}) center / cover no-repeat;
    position: relative;
    &::before, &::after {
        content: '';
        width: 60px;
        height: 1px;
        background: ${({$type})=> $type === 'dark' ? '#000' : '#fff'};
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
    }
    &::before {
        right: 55px;
    };
    &::after {
        left: 55px;
    };

    ${media.tablet`
        width: 27px;
        height: 27px;
        &::before, &::after {
            width: 48px
        }
        &::before {
            right: 40px;
        };
        &::after {
            left: 40px;
        };   
    `}

    &.footer_divider {
        position: absolute;
        bottom: 15px;
    }
`


export default function BeansDivider({type, hide, selector = ''}) {
    return (
        <Divider className = {selector} $hide = {hide} $type={type}/>
    )
}