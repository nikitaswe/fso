import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createPerson = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const deletePerson = id => {
  const request = axios.delete(baseUrl + `/${id}`)
  return request
}

const editPerson = newObject => {
  const request = axios.put(baseUrl + `/${newObject.id}`, newObject)
  return request.then(response => response.data)
}

const personsService = { getAll, createPerson, deletePerson, editPerson }
export default personsService
