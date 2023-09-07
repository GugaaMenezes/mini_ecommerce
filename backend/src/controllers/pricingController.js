const Product = require("../models/product");
const csvParser = require("../utils/csvParser");
const { query } = require("../config/database"); // Importe a função query corretamente

function calculateNewPrice(productCode, newPrice, salesPrice, costPrice) {

    //Compara o Novo Preço, com o preço de venda atual e o preõ de custo

    // Percentual máximo de variação do preço 
    let percentVariable = 0.1;

    const upperVariable = 1 + percentVariable;
    const downVariable = 1 - percentVariable;

    // Verifica se o Novo Preço é maior que o preço de custo
    if (newPrice < costPrice) {
        return {
            status: "error",
            reason: "Preço de venda inferior ao preço de custo",
            productCode: productCode,
            newPrice: newPrice,
            costPrice: costPrice
        };
        //Verifica se a variação do Novo Preço é maior que 10%
    } else if ( newPrice > (salesPrice * upperVariable) || newPrice < (salesPrice * downVariable) ) {
        return {
            status: "error",
            reason: "Produto teve uma variação maior que 10%",
            productCode: productCode,
            newPrice: newPrice,
            oldPrice: salesPrice
        };
    }

    return { status: "success", productCode: productCode, newPrice: newPrice };
}

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
