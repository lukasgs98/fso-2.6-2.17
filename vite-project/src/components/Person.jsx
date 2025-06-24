const Person = ({person, handleDelete}) => {
    return (
        <>
            <li>{person.name} {person.number}</li>
            <button 
                type="button" 
                id={person.id} 
                name={person.name} 
                onClick={handleDelete}>delete
            </button>
        </>
    )
}

export default Person