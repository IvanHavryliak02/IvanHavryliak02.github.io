import './ActionButton.sass'

export default function ActionButton({children}) {
    return (
        <button className="action-button">
            {children}
        </button>
    )
}