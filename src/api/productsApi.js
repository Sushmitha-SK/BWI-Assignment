import axios from "axios";
import api from "./endPoint";

//Get all products
export async function getProducts() {
    const url = `${api.baseApi}/products`;
    console.log(url)
    try {
        const response = await axios.get(url,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

        if (response.status === 200) {
            return response;
        }

    } catch (error) {
        console.log('Error', error)
    }
}

//Get products by search
export async function searchProducts(searchTerm) {
    const url = `${api.baseApi}/products/search?q=${searchTerm}`;
    console.log(url)
    try {
        const response = await axios.get(url,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        if (response.status === 200) {
            return response;
        }

    } catch (error) {
        console.log('Error', error)
    }
}