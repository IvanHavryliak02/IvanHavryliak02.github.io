import styled from 'styled-components';

const CoffeeCardEl = styled.div`
    width: 220px;
    min-height: 240px;
    padding: 20px;
    background: rgba(255,255,255, .65);
    border-radius: 8px;
`

const CardImg = styled.div`
    width: 170px;
    min-height: 130px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
        object-fit: contain;
    }
`

const CardHeader = styled.h3`
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    margin-top: 15px;
    text-align: center;
`

const Price = styled.span`
    display: block;
    font-size: 14px;
    font-weight: 700;
    line-height: 20px;
    text-align: right;
    margin-top: 10px;
`


export default function CoffeeCard({imgSrc, title, price}) {
    return(
        <CoffeeCardEl>
            <CardImg>
                <img src={imgSrc} alt="coffee"></img>
            </CardImg>
            <CardHeader>{title}</CardHeader>
            <Price>{price}$</Price>
        </CoffeeCardEl>
    )
}