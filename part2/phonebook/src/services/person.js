import axios from 'axios'

// connecting the froentend to the backend
const baseUrl = 'http://localhost:3001/api/persons'

// Get all persons
const getAll = () => axios.get(baseUrl).then(res => res.data)

// Create a new person
const create = newPerson => axios.post(baseUrl, newPerson).then(res => res.data)

// Delete a person by id
const remove = id => axios.delete(`${baseUrl}/${id}`)

// Update a person by id
const update = (id, updatedPerson) =>
  axios.put(`${baseUrl}/${id}`, updatedPerson).then(res => res.data)

export default { getAll, create, remove, update }
