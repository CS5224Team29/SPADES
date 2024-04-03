import axios from "axios";

const GATEWAY_BASE_URL = "https://kpkxx6puy7h4st72awjuaxm2di0xlbnq.lambda-url.us-east-1.on.aws";

const axiosInstance = axios.create({
    baseURL: GATEWAY_BASE_URL,
});




export async function deleteWatchList(props) {
    try {
        const { stock_id, user_id } = props;

        const response = await axios.delete(`${GATEWAY_BASE_URL}/watchlist/delete?user_id=${user_id}&ticker_id=${stock_id}`);

        return response.data;
    } catch (error) {
        console.error("Error deleting stock:", error);
        return null;
    }
}




export async function fetchWatchList(props) {
    try {
        const { user_id } = props;

        if (!user_id) {
            throw new Error("No user ID provided");
        }

        const response = await axiosInstance.get(`/watchlist/get?user_id=${user_id}`, {
            headers: {
                "Content-Type": "application/json",

            },
        });

        const watchlistDetails = response.data.data;

        console.log(watchlistDetails)

        return watchlistDetails;
    } catch (error) {
        console.error("Failed to fetch watchlist details:", error);
        return null;
    }
}

export async function addToWatchList(props) {
    try {
        const { user_id, stock_id } = props;

        if (!user_id) {
            throw new Error("No user ID provided");
        }
        if (!stock_id) {
            throw new Error("No stock ID provided");
        }



        const response = await axios.post(`${GATEWAY_BASE_URL}/watchlist/add?user_id=${user_id}&ticker_id=${stock_id}`, {}, {
            headers: {
                "Content-Type": "application/json",

            },
        });

        console.log('Stock added to watchlist successfully', response.data);
        return response.data;
    } catch (error) {
        console.error('Error adding stock to watchlist:', error);
        return null;
    }
}
