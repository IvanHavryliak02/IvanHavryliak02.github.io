import './FilterTemplate.sass'

export default function FilterTemplate(props) {

    const {
        className, 
        content, 
        filters, 
        onFilterChoose, 
        currFilter
    } = props

    const createFilterItems = (filters) => {
        return filters.map(filter => { 

            const activeSelector = currFilter === filter.id ? 'active' : ''

            return(
                <li 
                    className={`${className}__filters-item`}
                    onClick={() => onFilterChoose(filter.id)}
                    key={filter.id}
                >
                    <button className={`${className}__button ${activeSelector}`}>
                        {filter.label}
                    </button>
                </li>
            )
        })
    }

    const createListItems = (items) => {
        return items.map(item => {
            return <li 
                key={item.key}
            >
                {item}
            </li>
        })
    }

    return (
        <section className={className}>
            <div className="container">
                <div className={`${className}__wrapper`}>
                    <ul className={`${className}__content`}>
                        {createListItems(content)}
                    </ul>
                    <aside className={`${className}__filter`}>
                        <ul className={`${className}__filters`}>
                            {createFilterItems(filters)}
                        </ul>
                    </aside>
                </div>
            </div>
        </section>
    )
}