
import ImgPost from './../posts/ImgPost/ImgPost'
import GalleryPost from './../posts/GalleryPost/GalleryPost'
import VideoPost from './../posts/VideoPost/VideoPost'

import FilmPost from './../FilmPost/FilmPost'

import PodcastPost from './../PodcastPost/PodcastPost'

export default function PostsController(data) {

    const reactComponents = data.map(obj => {
        switch(obj.type){
            case 'post': {
                if(obj.video){
                    return <VideoPost key={obj.id} data={obj}/>
                }
                if(obj.imgs){
                    if(obj.imgs.length === 1){
                        return <ImgPost key={obj.id} data={obj}/>
                    } else if(obj.imgs.length > 1) {
                        return <GalleryPost key={obj.id} data={obj}/>
                    }
                }
            }
            case 'film': {
                return <FilmPost key={obj.id} data={obj}/>
            }
            case 'podcast': {
                return <PodcastPost key={obj.id} data={obj}/>
            }
            default: return null
        }
    })

    return reactComponents
}