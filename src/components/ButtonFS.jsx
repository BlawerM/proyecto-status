import "./ButtonFS.css"

function ButtonFS ({text, onClick}) {
    return (
        <button className="btn" onClick={onClick}>
            {text}
        </button>
    );
}

export default ButtonFS;