
import ImgPost from './../ImgPost/ImgPost'
import GalleryPost from './../GalleryPost/GalleryPost'
import VideoPost from './../VideoPost/VideoPost'

export default function PostsController(data) {

    const reactComponents = data.map(obj => {
        if(obj.video){
            return <VideoPost data={obj}/>
        }
        if(obj.imgs){
            if(obj.imgs.length === 1){
                return <ImgPost data={obj}/>
            } else if(obj.imgs.length > 1) {
                return <GalleryPost data={obj}/>
            }
        }
        return null
    })

    return reactComponents
}