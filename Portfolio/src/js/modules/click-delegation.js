
export default function(parent, callback){
    parent.addEventListener('click', (e) => {
        e.preventDefault();
        callback(e);
    })
}



