import axios from "axios";
const baseUrl = 'http://localhost:3003/api/login';

const login = async (username, password) => {
    const credentials = {
        username : username,
        password : password
    }
    const response = await axios.post(baseUrl, credentials);
    return response.data;
}

export default { login }