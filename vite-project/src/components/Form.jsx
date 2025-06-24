import Input from "./Input.jsx"

const Form = ({labels, states, handlers}) => {
    const handleChange = (setter, value) => {
        setter(value)
    }

    const inputLabels = labels.slice(1);
    const inputStates = states.slice(1);
    const inputHandlers = handlers.slice(1);
    
    return (
        <>
            <h2>{labels[0]}</h2>
            <form onSubmit={handlers[0]}>
                {inputLabels.map((label, index) => {
                    return (
                        <Input
                            key={label}
                            label={label}
                            value={inputStates[index]}
                            onChange={(event) => handleChange(inputHandlers[index], event.target.value)}
                        />
                    )
                })}
                <div>
                    <button type="submit">Add</button>
                </div>
            </form>
        </>
    )
}

export default Form;