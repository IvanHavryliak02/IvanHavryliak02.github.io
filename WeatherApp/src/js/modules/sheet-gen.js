
export default function createStyleSheet(){
    const sheetTag = document.createElement('style');
    sheetTag.id = 'components-styles';
    document.head.appendChild(sheetTag);
    return sheetTag.sheet;
}