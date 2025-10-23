import { Component } from 'react'
import styled from 'styled-components'
import BeansDivider from '../beans-divider/beans-divider'
import SubHeader from '../sub-header/sub-header'

const DescriptionBlockEl = styled.div`
    text-align: center;
    max-width: 590px;
    margin: 0 auto;
`

const TextWrapper = styled.div`
    margin-top: 41px;
    line-height: 20px;
    font-size: 14px;
`

export default class DescriptionBlock extends Component {
    render(){
        return (
            <DescriptionBlockEl>
                <SubHeader type={'dark'}>About Us</SubHeader>
                <BeansDivider type={'dark'}/>
                <TextWrapper>
                    <p>Extremity sweetness difficult behaviour he of. On disposal of as landlord horrible.
                    Afraid at highly months do things on at. Situation recommend objection do intention
                    so questions. As greatly removed calling pleased improve an. Last ask him cold feel
                    met spot shy want. Children me laughing we prospect answered followed. At it went
                    is song that held help face.</p><br/>
                    <br/>
                    <p>Now residence dashwoods she excellent you. Shade being under his bed her, Much
                    read on as draw. Blessing for ignorant exercise any yourself unpacked. Pleasant
                    horrible but confined day end marriage. Eagerness furniture set preserved far
                    recommend. Did even but nor are most gave hope. Secure active living depend son
                    repair day ladies now.</p>
                </TextWrapper>
            </DescriptionBlockEl>
        )
    }
}