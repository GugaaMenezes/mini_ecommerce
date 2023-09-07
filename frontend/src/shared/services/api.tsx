import axios from "axios";

const API_PRODUCTS = "http://localhost:5000/api/pricing";

export const updatePricing = async (data: unknown) => {
    try {
        return await axios.post(API_PRODUCTS, data);
    } catch (error) {
        console.log("Error enviar planilha", error);
    }
};

export const getProducts = async () => {
    try {
        return await axios.get(API_PRODUCTS);
    } catch (error) {
        console.log("Error while calling getProducts api", error);
    }

};