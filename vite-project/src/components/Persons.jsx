import Person from "./Person.jsx"

const Persons = ({persons}) => {
  return (
    <>
      <h2>People:</h2>
      <ul>
        {persons.map(person => 
          <Person key={person.id} person={person} />
        )}
      </ul>
    </>
  )
}

export default Persons