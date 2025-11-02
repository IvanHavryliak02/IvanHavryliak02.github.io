
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
            {articleName: 'AROMISTICO Coffee 1 kg', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', country: 'Brazil', price: 6.99, id: 1},
            {articleName: 'AROMISTICO Coffee 1 kg', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', country: 'Kenya', price: 6.99, id: 2},
            {articleName: 'Arabica Coffee 1 kg', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', country: 'Columbia', price: 6.99, id: 3},
            {articleName: 'Arabica Coffee 1 kg', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', country: 'Brazil', price: 6.99, id: 4},
            {articleName: 'Telestico Coffee 1 kg', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', country: 'Columbia', price: 6.99, id: 5},
            {articleName: 'Telestico Coffee 1 kg', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', country: 'Brazil', price: 6.99, id: 6},
        ],
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
        const countries = this.state.data.map(item => item.country);
        return Array.from(new Set(countries));
    }

    render() {
        const {changeAppState,sendDescData, appState} = this.props;
        const {data, term, filter} = this.state;
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