
import styled from 'styled-components'
import { Component } from 'react'
import Container from '../../Components/container/container'
import Filter from '../../Components/filter/filter'
import ShopCard from '../../Components/shop-card/shop-card'
import aramisticoCoffeeImg from './aramistico.png';

const CoffeeShopSectionEl = styled.section`
    min-height: 765px;
    padding: 60px 0 30px 0;
    background: #fff;
    display: ${({$hideSection}) => $hideSection ? 'none' : 'block'}
`
const ShopGrid = styled.div`
    margin: 0 auto;
    display: grid;
    grid-template: 260px / repeat(3, 220px);
    grid-auto-rows: 260px;
    grid-auto-flow: row;
    gap: 60px 70px;
`

const ShopGridWrap = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 61px;
`

export default class CoffeeShopSection extends Component{

    state = {
        data: [
            {articleName: 'AROMISTICO Coffee 1 kg', country: 'Brazil', price: 6.99, id: 1},
            {articleName: 'AROMISTICO Coffee 1 kg', country: 'Kenya', price: 6.99, id: 2},
            {articleName: 'AROMISTICO Coffee 1 kg', country: 'Columbia', price: 6.99, id: 3},
            {articleName: 'AROMISTICO Coffee 1 kg', country: 'Brazil', price: 6.99, id: 4},
            {articleName: 'AROMISTICO Coffee 1 kg', country: 'Brazil', price: 6.99, id: 5},
            {articleName: 'AROMISTICO Coffee 1 kg', country: 'Brazil', price: 6.99, id: 6},
        ],
        term: '',
        filter: ''
    }

    render() {
        const {appState} = this.props;
        const {data} = this.state;
        const hideSection = appState !== 'ourCoffee' && appState !== 'yourPleasure'
        const shopCards = data.map(element => (
            <ShopCard 
                src={aramisticoCoffeeImg} 
                title = {element.articleName}
                country = {element.country}
                price = {element.price}
                key = {element.id}   
            />
        ))
        return (
            <CoffeeShopSectionEl $hideSection = {hideSection}>
                <Container>
                    <Filter/>
                    <ShopGridWrap>
                        <ShopGrid>
                            {shopCards}
                        </ShopGrid>
                    </ShopGridWrap>
                </Container>
            </CoffeeShopSectionEl>
        )
    }
}