import './ActionButton.sass'

export default function ActionButton({ children, className, formData}) {

    let type, form

    if(formData) {
        type = formData.type
        form = formData.form
    }

    return (
        <button className={`action-button ${className}`} form={form} type={type}>
            {children}
        </button>
    )
}