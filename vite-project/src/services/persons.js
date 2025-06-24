import axios from "axios"

const baseURL = "http://localhost:3001/persons"

const getAll = () => {
    return axios.get(baseURL)
}

const addPerson = (newObject) => {
    return axios.post(baseURL, newObject)
}

const updatePerson = (id, newObject) => {
    return axios.put(`${baseURL}/${id}`, newObject)
}

const deletePerson = (id) => {
    return axios.delete(`${baseURL}/${id}`)
}

export default { getAll, addPerson, updatePerson, deletePerson }