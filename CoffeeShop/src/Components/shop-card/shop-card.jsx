import styled from "styled-components";

const ShopCardEl = styled.div`
    width: 100%;
    height: 100%;
    background: #fff;
    box-shadow: 4px 4px 20px 0 rgba(0, 0, 0, 0.25);
    padding: 35px 20px 20px 20px;
    border-radius: 8px;
    span {
        display: block;
        text-align: right;
        font-size: 14px;
        line-height: 20px;
    }
    &:hover {
        cursor: pointer
    }
`

const ImgContainer = styled.div`
    width: 100%;
    height: 115px;
    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
`

const Title = styled.h3`
    text-align: center;
    font-weight: 400;
    margin: 12px 0;
    font-size: 14px;
    line-height: 20px;
`

const Price = styled.span`
    font-weight: 700;
    margin-top: 10px;
`

export default function ShopCard({src, title, desc, country, price, changeAppState, sendDescData}) {
    return (
        <ShopCardEl onClick = {
            () => {
                changeAppState('coffeeDesc')
                sendDescData(src,country,desc,price)
            }}
        >
            <ImgContainer>
                <img src={src} alt='coffee'/>
            </ImgContainer>
            <Title>{title}</Title>
            <span>{country}</span>
            <Price>{price}$</Price>
        </ShopCardEl>
    )
}