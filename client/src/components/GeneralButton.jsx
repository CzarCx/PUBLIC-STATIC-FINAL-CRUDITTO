function GeneralButton ({type, text, onClick, className, style, id}) {
    return (
        <button style={style} id={id} className = {className} type = {type} onClick={onClick}>{text}</button>
    )
}

export default GeneralButton