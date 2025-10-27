import { Component } from 'react'
import styled from 'styled-components'
import BeansDivider from '../beans-divider/beans-divider'
import SubHeader from '../sub-header/sub-header'

const DescriptionBlockEl = styled.div`
    text-align: center;
    width: 100%;
    margin: 0 auto;
`

const TextWrapper = styled.div`
    margin-top: 41px;
    line-height: 20px;
    font-size: 14px;
    p {
        &:nth-child(1){
            margin-bottom: 20px
        }
    }
`


export default class DescriptionBlock extends Component {
    render(){
        const {title, paragraphs} = this.props;
        let i = 0;
        const content = paragraphs.map((paragraph) => {
            i++
            return <p key={i}>{paragraph}</p>
        })
        return (
            <DescriptionBlockEl>
                <SubHeader type={'dark'}>{title}</SubHeader>
                <BeansDivider type={'dark'}/>
                <TextWrapper>
                    {content}
                </TextWrapper>
            </DescriptionBlockEl>
        )
    }
}