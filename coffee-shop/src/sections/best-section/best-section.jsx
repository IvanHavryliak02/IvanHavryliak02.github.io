import styled from 'styled-components'

import SubHeader from '../../Components/sub-header/sub-header'
import CoffeeCard from '../../Components/coffee-card/coffee-card'
import Container from '../../Components/container/container'

import imageBg from './best-bg.png'
import imageCoffA from './coffeeA.png'
import imageCoffB from './coffeeB.png'
import imageCoffC from './coffeeC.png'

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

export default function BestSection({appState}) {
    const hideSection = appState !== 'primary';
    return (
        <BestSectionEl $hideSection={hideSection}>
            <Container>
                <SubHeader type={'dark'}>Our best</SubHeader>
                <CardsWrap>
                    <CoffeeCard 
                        imgSrc={imageCoffA} 
                        title={'Solimo Coffee Beans 2 kg'}
                        price={10.73}
                    />
                    <CoffeeCard
                        imgSrc={imageCoffB} 
                        title={'Presto Coffee Beans 1 kg'}
                        price={15.99}
                    />
                    <CoffeeCard
                        imgSrc={imageCoffC} 
                        title={'AROMISTICO Coffee 1 kg'}
                        price={6.99}
                    />
                </CardsWrap>
            </Container>
        </BestSectionEl>
        

    )
}

