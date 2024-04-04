import { axiosInstance } from '../Utils/AxiosInstance';

export async function fetchStocksBySector(props) {
    try {
        const { sector } = props;

        if (!sector) {
            throw new Error("No sector provided");
        }

        const response = await axiosInstance.get(`ticker/sector?sector=${sector}`, {
            headers: {
                "Content-Type": "application/json",

            },
        });


        return response.data.data;
    } catch (error) {
        console.error("Failed to fetch stocks by sector:", error);
        return null;
    }
}



export async function searchStock(props) {
    try {
        const { searchText } = props;

        if (!searchText) {
            throw new Error("No search text provided");
        }

        const response = await axiosInstance.get(`/ticker/name?name=${searchText}`, {
            headers: {
                "Content-Type": "application/json",

            },
        });

        return response.data.data;
    } catch (error) {
        console.error("Failed to search stock:", error);
        return null;
    }
}

