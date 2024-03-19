import axios from "axios";

const GATEWAY_BASE_URL = "https://yourgateway.url";

export const deleteWatchList = (stock_id) => {
    axios.delete(`${GATEWAY_BASE_URL}/api/stocks/${stock_id}`)
        .then(response => response.data)
        .catch(error => console.error("Error deleting stock:", error));
};



export const fetchWatchList = () => {
    return axios.get(`${GATEWAY_BASE_URL}/api/watchlist`)
        .then(response => response.data)
        .catch(error => {
            throw error;
        });
};

export const addToWatchList = (stock_id) => {
    const payload = {
        stock_id: stock_id,

    };


    axios.post(`${GATEWAY_BASE_URL}/api/watchlist/add`, payload)
        .then(response => {
            console.log('Stock added to watchlist successfully', response.data);

        })
        .catch(error => {
            console.error('Error adding stock to watchlist:', error);

        });
};