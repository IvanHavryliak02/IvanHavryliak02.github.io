import './Filter.sass'
import { useState } from 'react'

import Button from './../Button/Button' 

export default function Filter({render, onShowFiltration, categories, onFiltersChange}) {

    const showClass = render ? 'filter_show' : ''

    const [filters, setFilters] = useState([])

    const changeFilters = () => {
        onFiltersChange(filters)
    }


    const createCategories = () => {
        const res = []
        for(let key in categories){
            res.push(
                (<label 
                        key={key}>
                        <input onChange={(e) => {
                            if(e.target.checked){
                                setFilters(prevFilters => [...prevFilters, categories[key]])
                            } else {
                                setFilters(prevFilters => {
                                    const index = prevFilters.indexOf(categories[key])
                                    return [...prevFilters.slice(0, index), ...prevFilters.slice(index + 1)]
                                })
                            }
                        }} 
                        type="checkbox" 
                        className='filter__checkbox'
                    />
                    {categories[key]}
                </label>)
            )
        }
        return res
    }
    
    return (
        <div className={`filter ${showClass}`}>
            <div className="filter__content">
                <div className="filter__checks">
                    {createCategories()}
                </div>
                <div className="filter__btn-group">
                    <Button color='gray' onClickHandler={() => onShowFiltration(false)}>zamknij</Button>
                    <Button onClickHandler={changeFilters}>filtruj</Button>
                </div>
            </div>
        </div>
    )
}