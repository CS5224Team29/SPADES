import axios from 'axios';


const BASE_URL = 'YOUR_API_ENDPOINT';

export const fetchStocksBySector = (sector) => {
    return axios.get(`${BASE_URL}?sector=${encodeURIComponent(sector)}`)
        .then(response => response.data)
        .catch(error => {
            throw error;
        });
};


export const searchStock = (searchText) => {

    return axios.get(`${BASE_URL}/api/stocks/search`, {
        params: {
            query: searchText
        }
    })
        .then(response => {
            console.log('Search results:', response.data);
            return response.data;
        })
        .catch(error => {
            console.error('Error searching for stocks:', error);
            throw error;
        });
};