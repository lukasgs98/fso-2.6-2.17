const Notification = ({message, type}) => {
    const style = {
        "backgroundColor": (type === "error" ? "red" : "green"),
        "border": "none",
        "borderRadius": "5px",
        "width": "max-content",
        "padding": "0.5em",
        "margin": "0.5rem 0",
        "color": "white"
    }

    if (message) {
        return (
            <div className={`notification ${type}`} style={style}>
                {message}
            </div>
        )
    } else {
        return null
    }
}

export default Notification