import Person from "./Person.jsx"

const Persons = ({persons, handleDelete}) => {
  return (
    <>
      <h2>People:</h2>
      <ul>
        {persons.map(person => 
          <Person key={person.id} person={person} handleDelete={handleDelete} />
        )}
      </ul>
    </>
  )
}

export default Persons