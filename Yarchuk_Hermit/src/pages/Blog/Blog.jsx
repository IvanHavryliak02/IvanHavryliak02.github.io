import './Blog.sass'
import { useState } from 'react'

import FilterTemplate from './../../components/FilterTemplate/FilterTemplate'
import ImgPost from './../../components/postsItems/posts/ImgPost/ImgPost'
import GalleryPost from './../../components/postsItems/posts/GalleryPost/GalleryPost'
import VideoPost from '../../components/postsItems/posts/VideoPost/VideoPost'
import FilmPost from './../../components/postsItems/FilmPost/FilmPost'
import PodcastPost from './../../components/postsItems/PodcastPost/PodcastPost'

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
                <VideoPost key={3}/>,
                <FilmPost key={4}/>,
                <PodcastPost key={5}/>
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
