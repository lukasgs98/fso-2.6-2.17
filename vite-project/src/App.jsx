import { useState, useEffect } from "react"
import services from "./services/persons.js"
import Persons from "./components/Persons.jsx"
import Form from "./components/Form.jsx"
import Filter from "./components/Filter.jsx"

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [currentFilter, setCurrentFilter] = useState("")
  
  useEffect(() => {
    services.getAll().then(response => {
      setPersons(response.data)
    })
  }, [])

  const filteredPersons = persons.filter(person => {
    return person.name.toUpperCase().includes(currentFilter.toUpperCase())
  })

  const handleSubmit = (event) => {
    event.preventDefault()

    const newObject = {
      "name": newName, "number": newNumber
    }

    const exists = persons.find((person) => person.name === newName)
    if (exists) {
      if (confirm(`${newName} is already added to the phonebook. Replace the number?`)) {
        services.updatePerson(exists.id, newObject)
          .then(response => setPersons(
            persons.map(person => person.id === response.data.id ? response.data : person)
          )
        )
      }
    } else {
      services.addPerson(newObject)
        .then(response => setPersons(persons.concat(response.data)))
    }
    setNewName("")
    setNewNumber("")
  }

  const handleDelete = (event) => {
    if (confirm(`Delete ${event.target.name}?`)) {
      services.deletePerson(event.target.id)
        .catch(error => console.log("Person already deleted!"))

      setPersons(persons.filter(person => person.id !== event.target.id))
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter 
        currentFilter={currentFilter} 
        onChange={setCurrentFilter} 
      />
      <Form 
        labels={["Add a new", "Name", "Phone number"]} 
        states={[undefined, newName, newNumber]} 
        handlers={[handleSubmit, setNewName, setNewNumber]} 
      />
      <Persons 
        persons={filteredPersons}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default App
