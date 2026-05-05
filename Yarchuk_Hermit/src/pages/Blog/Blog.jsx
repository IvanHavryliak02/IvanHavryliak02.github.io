import './Blog.sass'
import { useState } from 'react'

import FilterTemplate from './../../components/FilterTemplate/FilterTemplate'
import Post from './../../components/postsItems/Post/Post'

export default function Blog() {

    const [currFilter, setCurrFilter] = useState('post')

    const onFilterChoose = (filterId) => {
        setCurrFilter(filterId)
    }

    return (
        <FilterTemplate 
            className='blog'
            content={
                <>
                    <Post/>
                    <Post/>
                    <Post/>
                </>
            }
            filters={[
                {id:'post', label: 'пост'},
                {id:'film', label: 'фільм'}, 
                {id:'podcast', label: 'Подкаст'}, 
                {id:'event', label: 'подія'}
            ]}
            onFilterChoose={onFilterChoose}
            currFilter={currFilter}
        />
    )
}
