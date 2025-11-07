import {Component} from 'react'
import styled from 'styled-components'
import { media } from '../../utils/media'

const FilterEl = styled.div`
    max-width: 800px;
    display: flex;
    justify-content: space-around;
    margin: 0 auto;

    ${media.tablet`
        flex-direction: column;
        align-items: center    
    `}
`

const TitledGroup = styled.div`
    display: flex;
    min-width: ${({$width}) => $width}px;
    align-items: center;
    justify-content: space-between;
    input {
        width: 180px;
        height: 30px;
        font-size: 12px;
        border: none;
        border-radius: 4px;
        box-shadow: 4px 4px 20px 0 rgba(0, 0, 0, 0.25);
        background: #fff;
        text-align: center; 
    }
    span {
        font-size: 14px;
        line-height: 20px;
        color: #000
    }
    div.wrap {
        display: flex;
        min-width: 235px;
        justify-content: space-between;
        button {
            width: 75px;
            height: 30px;
            border: none;
            background: #fff;
            box-shadow: 4px 4px 20px 0 rgba(0, 0, 0, 0.25);
            &:hover {
                cursor: pointer
            }
        }
    }

    ${media.tablet`
        &:first-child {
            margin-bottom: 50px
        }
    `}

    ${media.mobile`
        flex-direction: column;
        min-width: auto;
        span {
            margin-bottom: 10px
        }    
    `}
`

export default class Filter extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            buttonsTitles: this.props.createButtonsTitle(),
            term: '',
            filter: ''
        }
    }

    changeStateValue = (value, callback, stateKey) => {
        callback(value);
        this.setState({
            [stateKey]: value
        })
    }

    render() {
        const {changeTerm, changeFilter} = this.props
        const buttons = this.state.buttonsTitles.map((buttonTitle, index) => {
            const styles = this.state.filter.toLowerCase() === buttonTitle.toLowerCase() ? {background: 'rgba(0,0,0,0.4)', color: '#fff'} : {}
            return (
                <button key={index} style={styles} onClick={
                        (e) => {
                            this.changeStateValue(
                                e.target.textContent,
                                changeFilter,
                                'filter'
                            )
                        }
                    }
                >{buttonTitle}</button>
            )
            
        })
        return (
            <FilterEl>
                <TitledGroup $width={285}>
                    <span>Looking for</span>
                    <input 
                        placeholder='start typing here...'
                        value={this.state.term}
                        onFocus={() => {
                            this.changeStateValue(
                                '',
                                changeFilter,
                                'filter'
                            );  
                        }}
                        onChange={(e) => {
                            this.changeStateValue(
                                e.target.value,
                                changeTerm,
                                'term'
                            );  
                        }} 
                    />
                </TitledGroup>
                <TitledGroup $width={325}>
                    <span>Or filter</span>
                    <div className='wrap'>
                        {buttons}
                    </div>
                </TitledGroup>
            </FilterEl>
        )
    }

}