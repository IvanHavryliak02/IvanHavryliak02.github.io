import { Component } from 'react'
import styled from 'styled-components'
import BeansDivider from '../beans-divider/beans-divider'
import SubHeader from '../sub-header/sub-header'

const DescriptionBlockEl = styled.div`
    width: 100%;
    margin: 0 auto;
    text-align: ${({$stateIsCoffeeDesc}) => $stateIsCoffeeDesc ? 'start' : 'center'}
`

const TextWrapper = styled.div`
    margin-top: 41px;
    line-height: 20px;
    font-size: 14px;
    p {
        &:nth-child(1){
            margin-bottom: 20px;
        }
        &:nth-last-child(2){
            margin-bottom: ${({$stateIsCoffeeDesc}) => $stateIsCoffeeDesc ? '20px' : 'auto'};
        }
    }
`


export default class DescriptionBlock extends Component {
    render(){
        const {title, paragraphs, appState} = this.props;
        const stateIsCoffeeDesc = appState === 'coffeeDesc'
        const content = paragraphs.map((paragraph, i) => {
            
            return <p key={i}>{paragraph}</p>
        })
        return (
            <DescriptionBlockEl $stateIsCoffeeDesc={stateIsCoffeeDesc}>
                <SubHeader type={'dark'}>{title}</SubHeader>
                <BeansDivider type={'dark'}/>
                <TextWrapper $stateIsCoffeeDesc={stateIsCoffeeDesc}>
                    {content}
                </TextWrapper>
            </DescriptionBlockEl>
        )
    }
}