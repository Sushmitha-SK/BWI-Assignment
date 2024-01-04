import axios from "axios";
import api from "./endPoint";

// Login
export async function loginUser(username, password) {
    const url = `${api.baseApi}/auth/login`;
    console.log(url);

    try {
        const response = await axios.post(url, JSON.stringify({
            "username": username,
            "password": password
        }), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;

    } catch (error) {
        if (error.response) {
            return error.response;
        } else {
            throw error;
        }
    }
}
