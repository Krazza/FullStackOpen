import axios from "axios";

let baseUrl;
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    baseUrl = "http://localhost:3005/api/persons"
} else {
    baseUrl = "api/persons";
}

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject);
    return request.then(response => response.data);
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject);
    return request.then(response => response.data);
}

const erase = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then(response => response.data);
}

const numberService = { getAll, create, update, erase }

export default numberService;