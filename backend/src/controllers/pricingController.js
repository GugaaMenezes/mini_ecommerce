const Product = require("../models/product");
const csvParser = require("../utils/csvParser");
const { query } = require("../config/database");
const { calculateNewPrice } = require("../controllers/functionsPricing"); //Importação das regras de negócio

class PricingController {
    static async validateAndProcessPricingFile(req, res, connection) {
        try {
            const filePath = req.file.path;
            const pricingData = await csvParser.parseCSV(filePath);

            const productsError = [];
            const productsSuccess = [];

            for (const product of pricingData) {
                // Consulta ao banco de dados para obter o produto com base no product_code
                const sql = "SELECT * FROM products WHERE code = ?";
                const existingProduct = await query(
                    sql,
                    [product.product_code],
                    [product.new_price]
                );

                const productCode = product.product_code;
                const newPrice = product.new_price;
                const salesPrice = existingProduct[0]["sales_price"];
                const costPrice = existingProduct[0]["cost_price"];

                // Pular para o próximo produto se não for encontrado
                if (!existingProduct.length) {
                    console.error("Produto não encontrado no banco de dados.");
                    continue; 
                }
                // Verifica se o preço se adequa a regra de negócio
                const resultCalculatedNewPrice = calculateNewPrice(
                    productCode,
                    newPrice,
                    salesPrice,
                    costPrice
                );

                // Atualizar o banco de dados com o novo preço
                switch (resultCalculatedNewPrice.status) {
                    case "error":

                        productsError.push(resultCalculatedNewPrice);
                        break;
                    case "success":
                        const updateSql =
                            "UPDATE products SET sales_price = ? WHERE code = ?";
                        await query(updateSql, [
                            product.new_price,
                            product.product_code,
                        ]);
                        productsSuccess.push(resultCalculatedNewPrice);
                }
            }
            console.log(productsError);
            console.log("----------------------------------------------------");
            console.log(productsSuccess);

            res.status(200).json({ message: "Preços atualizados com sucesso" });
        } catch (error) {
            console.error("Erro na validação/processamento do arquivo:", error);
            res.status(500).json({
                error: "Erro na validação/processamento do arquivo",
            });
        }
    }
}

module.exports = PricingController;
