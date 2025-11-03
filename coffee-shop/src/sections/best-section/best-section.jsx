import styled from 'styled-components'

import SubHeader from '../../Components/sub-header/sub-header'
import CoffeeCard from '../../Components/coffee-card/coffee-card'
import Container from '../../Components/container/container'

import imageBg from './best-bg.png'

const BestSectionEl = styled.section`
    min-height: 500px;
    background: url(${imageBg}) center / cover no-repeat;
    padding: 80px 0 100px 0;
    display: ${({$hideSection}) => $hideSection ? 'none' : 'block'}
`

const CardsWrap = styled.div`
    width: 800px;
    display: flex;
    justify-content: space-between;
    margin: 40px auto 0 auto;
`

export default function BestSection({appState, changeAppState, bestGoods, sendDescData}) {
    const hideSection = appState !== 'primary';

    const coffeeCards = bestGoods.map((bestGood, i) => (
        <CoffeeCard 
            imgSrc={bestGood.img.src}
            alt={bestGood.img.alt} 
            title={bestGood.title}
            price={bestGood.price}
            country={bestGood.country}
            desc={bestGood.desc}
            key={i}
            changeAppState={changeAppState}
            sendDescData={sendDescData}
        />
    ))
    return (
        <BestSectionEl $hideSection={hideSection}>
            <Container>
                <SubHeader type={'dark'}>Our best</SubHeader>
                <CardsWrap>
                    {coffeeCards}
                </CardsWrap>
            </Container>
        </BestSectionEl>
        

    )
}

