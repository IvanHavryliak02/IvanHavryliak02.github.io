import './FilterTemplate.sass'

export default function FilterTemplate(props) {

    const {
        className, 
        content, 
        filters, 
        onFilterChoose, 
        currFilter
    } = props

    const createListItems = (filters) => {
        return filters.map(filter => { 

            const activeSelector = currFilter === filter.id ? 'active' : ''

            return(
                <li 
                    className={`${className}__filters-item`}
                    onClick={() => onFilterChoose(filter.id)}
                >
                    <button className={`${className}__button ${activeSelector}`}>
                        {filter.label}
                    </button>
                </li>
            )
        })
    } 

    return (
        <section className={className}>
            <div className="container">
                <div className={`${className}__wrapper`}>
                    <div className={`${className}__content`}>
                        {content}
                    </div>
                    <aside className={`${className}__filter`}>
                        <ul className={`${className}__filters`}>
                            {createListItems(filters)}
                        </ul>
                    </aside>
                </div>
            </div>
        </section>
    )
}