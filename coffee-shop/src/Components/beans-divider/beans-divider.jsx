import styled from "styled-components";
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
    &::before {
        content: '';
        width: 60px;
        height: 1px;
        background: ${({$type})=> $type === 'dark' ? '#000' : '#fff'};
        position: absolute;
        top: 50%;
        right: calc(25px + 30px);
        transform: translateY(-50%);
    };
    &::after {
        content: '';
        width: 60px;
        height: 1px;
        background: ${({$type})=> $type === 'dark' ? '#000' : '#fff'};
        position: absolute;
        top: 50%;
        left: calc(25px + 30px);
        transform: translateY(-50%);
    };

`


export default function BeansDivider({type, hide}) {
    return (
        <Divider $hide = {hide} $type={type}/>
    )
}