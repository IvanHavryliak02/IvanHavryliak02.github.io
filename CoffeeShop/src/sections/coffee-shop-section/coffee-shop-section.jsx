
import styled from 'styled-components'
import { Component } from 'react'
import { media } from '../../utils/media'

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

    ${media.laptop`
        gap: 30px 40px;    
    `}

    ${media.tablet`
        grid-template: auto / 220px;   
    `}
`

const ShopGridWrap = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 61px;
`

export default class CoffeeShopSection extends Component{

    state = {
        term: '',
        filter: ''
    }

    changeTerm = (term) => {
        this.setState({
            term: term,
            filter: ''
        })
    }

    changeFilter = (newFilter) => {
        this.setState({
            filter: newFilter
        })
    }

    createButtonsTitle = () => {
        const countries = this.props.data.map(item => item.country);
        return Array.from(new Set(countries));
    }

    render() {
        const {changeAppState,sendDescData, appState, data} = this.props;
        const {term, filter} = this.state;
        const hideSection = appState !== 'ourCoffee' && appState !== 'yourPleasure'
        let cardsToShow = data.filter(element => element.articleName.toLowerCase().includes(term.toLowerCase()))
            .filter(element => element.country.toLowerCase().includes(filter.toLowerCase()))

        const shopCards = cardsToShow.map(element => 
            <ShopCard 
                src={aramisticoCoffeeImg} 
                title = {element.articleName}
                desc = {element.desc}
                country = {element.country}
                price = {element.price}
                key = {element.id}
                changeAppState = {changeAppState}
                sendDescData={sendDescData}    
            />
        )

        return (
            <CoffeeShopSectionEl $hideSection = {hideSection}>
                <Container>
                    <Filter 
                        changeTerm={this.changeTerm}
                        changeFilter={this.changeFilter}
                        createButtonsTitle={this.createButtonsTitle}
                    />
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