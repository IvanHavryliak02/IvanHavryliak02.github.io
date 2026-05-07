import './ActionButton.sass'

export default function ActionButton({ children, className }) {
    return (
        <button className={`action-button ${className}`}>
            {children}
        </button>
    )
}