import axios from "axios"
const baseUrl = "http://localhost:3003/api/bloglist"

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const getOne = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
}

const create = async (newBlog) => {
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.post(baseUrl, newBlog, config)
    return response.data
}

const update = async (blog) => {
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.put(`${baseUrl}/${blog.id}`, blog, config)
    return response.data
}

const removeOne = async (id) => {
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response
}
// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, setToken, getOne, update, removeOne }