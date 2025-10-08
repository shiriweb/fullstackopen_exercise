import axios from 'axios';
const baseUrl = '/api/persons';


// Added the functionality to the app
//used get method to read
const getAll = () => axios.get(baseUrl);

const create = newPerson => axios.post(baseUrl, newPerson);

//used put method to update
const update = (id, newObject) => axios.put(`${baseUrl}/${id}`, newObject);

//used  delete method to remove
const remove = id => axios.delete(`${baseUrl}/${id}`);

export default { getAll, create, update, remove };