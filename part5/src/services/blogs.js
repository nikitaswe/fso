import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const get = blogId => {
  const request = axios.get(baseUrl + '/' + blogId)
  return request.then(response => response.data)
}

const update = async (blogId, obj, token) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.put(baseUrl + '/' + blogId, obj, config)
  return response.data
}

const deleteBlog = async (blogId, token) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(baseUrl + '/' + blogId, config)
  return response.data
}

const create = async (newBlog, token) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const exportedObject = {
  getAll,
  create,
  update,
  deleteBlog,
  get
}

export default exportedObject
