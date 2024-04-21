import { axiosStockInstance } from "../Utils/AxiosInstance";

export async function fetchStocksBySymbol(props) {
    try {
        const { symbol } = props;

        if (!symbol) {
            throw new Error("No sector provided");
        }

        const response = await axiosStockInstance.post(`/stock-data?symbol=${symbol}`, {
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

export async function predictStocksBySymbol(props) {
    try {
        const { symbol } = props;

        if (!symbol) {
            throw new Error("No sector provided");
        }

        const response = await axiosStockInstance.post(`/predict?symbol=${symbol}`, {
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