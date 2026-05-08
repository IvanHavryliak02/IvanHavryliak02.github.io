import './Blog.sass'
import { useMemo, useState } from 'react'


import FilterTemplate from './../../components/FilterTemplate/FilterTemplate'
import PostsController from './../../components/postsItems/PostsController/PostsController.jsx'

import data from './data.js'

export default function Blog() {

    const [currFilter, setCurrFilter] = useState('post')

    const onFilterChoose = (filterId) => {
        setCurrFilter(filterId)
    }

    const filteredData = useMemo(() => {
        return data.filter(obj => obj.type === currFilter)
    }, [currFilter, data])

    return (
        <FilterTemplate 
            className='blog'
            content={PostsController(filteredData)}
            filters={[
                {id:'post', label: 'дописи'},
                {id:'film', label: 'фільми'}, 
                {id:'podcast', label: 'Подкасти'}, 
                {id:'event', label: 'події'}
            ]}
            onFilterChoose={onFilterChoose}
            currFilter={currFilter}
        />
    )
}
