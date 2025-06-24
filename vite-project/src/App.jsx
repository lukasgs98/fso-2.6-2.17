import { useState, useEffect } from "react"
import axios from "axios"
import Persons from "./components/Persons.jsx"
import Form from "./components/Form.jsx"
import Filter from "./components/Filter.jsx"

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [currentFilter, setCurrentFilter] = useState("")
  
  useEffect(() => {
    axios.get("http://localhost:3001/persons").then(response => {
      setPersons(response.data)
    })
  }, [])

  const filteredPersons = persons.filter(person => {
    return person.name.toUpperCase().includes(currentFilter.toUpperCase())
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to the phonebook`)
    } else {
      setPersons([...persons, {"id": newName, "name": newName, "number": newNumber}])
    }
    setNewName("")
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
      />
    </div>
  )
}

export default App
