import axios from "axios";

const API_PRICING = "http://localhost:5000/api/pricing";
const API_PRODUCTS = "http://localhost:5000/api/products";

export const updatePricing = async (data: unknown) => {
    try {
        return await axios.post(API_PRICING, data);
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