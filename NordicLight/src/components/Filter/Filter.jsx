import './Filter.sass'
import Button from './../Button/Button' 

export default function Filter({render, onShowFiltration, categories}) {

    const showClass = render ? 'filter_show' : ''

    const createCategories = () => {
        const res = []
        for(let key in categories){
            res.push(
                (<label>
                    <input type="checkbox" className='filter__checkbox'/>
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
                    <Button color='gray' onClickHandler={() => onShowFiltration(false)}>cofnij</Button>
                    <Button>filtruj</Button>
                </div>
            </div>
        </div>
    )
}