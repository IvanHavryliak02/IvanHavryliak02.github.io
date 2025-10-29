import {Component} from 'react'
import styled from 'styled-components'

const FilterEl = styled.div`
    max-width: 800px;
    display: flex;
    justify-content: space-around;
    margin: 0 auto;
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
`

export default class Filter extends Component {
    
    constructor(props){
        super(props);
        this.state = {
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
                        <button onClick={
                            (e) => {
                                this.changeStateValue(
                                    e.target.textContent,
                                    changeFilter,
                                    'filter'
                                )
                            }
                        }
                        >Brazil</button>
                        <button onClick={
                            (e) => {
                                this.changeStateValue(
                                    e.target.textContent,
                                    changeFilter,
                                    'filter'
                                )
                            }
                        }
                        >Kenya</button>
                        <button onClick={
                            (e) => {
                                this.changeStateValue(
                                    e.target.textContent,
                                    changeFilter,
                                    'filter'
                                );
                            }
                        }>Columbia</button>
                    </div>
                </TitledGroup>
            </FilterEl>
        )
    }

}