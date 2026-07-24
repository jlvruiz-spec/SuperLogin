const TextArea = ({ id, label, value, onChange, ...props }) => {

    return (
        <div className="input-container">
            <label htmlFor={id}>{label}</label>
            <textarea id={id} value={value} onChange={onChange} {...props} />
        </div>
    )
}
export default TextArea;