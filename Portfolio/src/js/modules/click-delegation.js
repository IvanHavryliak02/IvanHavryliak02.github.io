
export default function(parent, targetSelector, callback){
    parent.addEventListener('click', (e) => {
        e.preventDefault();
        const clickedItem = e.target.closest(targetSelector);
        if(clickedItem){
            callback(clickedItem);
        }
    })
}



