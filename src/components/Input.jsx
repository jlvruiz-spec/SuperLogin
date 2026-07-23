const Input = ({ id, label, value, onChange, ...props }) => {

    return (
        <div className="input-container">
            <label htmlFor={id}>{label}</label>
            <input id={id} value={value} onChange={onChange} {...props} />
        </div>
    )
}
export default Input;
