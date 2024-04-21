import { axiosStockInstance } from "../Utils/axiosStockInstance";

export async function fetchStocksBySector(props) {
    try {
        const { sector } = props;

        if (!sector) {
            throw new Error("No sector provided");
        }

        const response = await axiosStockInstance.get(`/stock-data?sector=${sector}`, {
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