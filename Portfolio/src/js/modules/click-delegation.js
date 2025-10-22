
export default function(parent, targetSelector, callback, preventDefault = false){
    parent.addEventListener('click', (e) => {
        if(preventDefault){
            e.preventDefault();
        }
        const clickedItem = e.target.closest(targetSelector);
        if(clickedItem){
            callback(clickedItem);
        }
    })
}



