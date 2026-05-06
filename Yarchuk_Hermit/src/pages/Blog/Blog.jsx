import './Blog.sass'
import { useState } from 'react'

import FilterTemplate from './../../components/FilterTemplate/FilterTemplate'
import ImgPost from './../../components/postsItems/Post/ImgPost/ImgPost'
import GalleryPost from './../../components/postsItems/Post/GalleryPost/GalleryPost'
import VideoPost from '../../components/postsItems/Post/VideoPost/VideoPost'

export default function Blog() {

    const [currFilter, setCurrFilter] = useState('post')

    const onFilterChoose = (filterId) => {
        setCurrFilter(filterId)
    }

    return (
        <FilterTemplate 
            className='blog'
            content={[
                <ImgPost key={1}/>,
                <GalleryPost key={2}/>,
                <VideoPost key={3}/>
            ]}
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
