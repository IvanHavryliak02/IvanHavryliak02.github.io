import './Blog.sass'
import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'


import FilterTemplate from './../../components/FilterTemplate/FilterTemplate'
import PostsController from './../../components/postsItems/PostsController/PostsController.jsx'

import data from './data.js'

export default function Blog() {

    const [searchParams, setSearchParams] = useSearchParams()

    const currFilter = searchParams.get('type') || 'post'

    const onFilterChoose = (filterId) => {
        setSearchParams({type: filterId})
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
