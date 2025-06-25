import { useState, useEffect } from "react"
import services from "./services/persons.js"
import Persons from "./components/Persons.jsx"
import Form from "./components/Form.jsx"
import Filter from "./components/Filter.jsx"
import Notification from "./components/Notification.jsx"

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [currentFilter, setCurrentFilter] = useState("")
  const [notification, setNotification] = useState({"message": null, "type": null})
  
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
          .then(response => {
            setPersons(
              persons.map(person => person.id === response.data.id ? response.data : person)
            )
            setNotification(
              {"message": `${newName} successfully updated`, "type": "success"}
            )
          })
          .catch(error => {
            setPersons(persons.filter(person => person.name !== newName))
            setNotification(
              {"message": `${newName} was already deleted from the phonebook`, "type": "error"}
            )
          })
      }
    } else {
      services.addPerson(newObject)
        .then(response => setPersons(persons.concat(response.data)))
      setNotification({"message": `${newName} successfully added to phonebook`, "type": "success"})
    }
    setNewName("")
    setNewNumber("")
    setTimeout(() => setNotification({"message": null, "type": null}), 5000)
  }

  const handleDelete = (event) => {
    if (confirm(`Delete ${event.target.name}?`)) {
      services.deletePerson(event.target.id)
        .then(response => setNotification(
          {"message": `${event.target.name} successfully deleted from phonebook`, 
           "type": "success"}
          ))
        .catch(error => setNotification(
          {"message": `${event.target.name} was already deleted from the phonebook`, 
           "type": "error"}
          ))
      setPersons(persons.filter(person => person.id !== event.target.id))
      setTimeout(() => setNotification({"message": null, "type": null}), 5000)
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification 
        message={notification.message}
        type={notification.type}
      />
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