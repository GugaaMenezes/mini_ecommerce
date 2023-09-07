const Product = require("../models/product");
const csvParser = require("../utils/csvParser");
const { query } = require("../config/database"); // Importe a função query corretamente

function calculateNewPrice(productCode, newPrice, salesPrice, costPrice) {
    // Aqui você pode implementar a lógica de cálculo do novo preço
    // Por exemplo, você pode aplicar um desconto ou uma fórmula específica.
    // Suponha que você aplique um desconto de 10%:

    const percentVariable = 0.1;
    const upperVariable = 1 + percentVariable;
    const downVariable = 1 - percentVariable;


    if ( newPrice < costPrice ) {
        return {
            status: "error",
            reason: "Preço de venda inferior ao preço de custo",
            productCode: productCode,
            newPrice: newPrice,
            oldPrice: salesPrice,
        };

    } else if ( newPrice > salesPrice * upperVariable || newPrice < salesPrice * downVariable ) {
        return {
            status: "error",
            reason: "Produto teve uma variação maior que 10%",
            productCode: productCode,
            newPrice: newPrice,
            oldPrice: salesPrice,
            costPrice: costPrice
        };
    }

    // const currentPrice = existingProduct.price;
    // const discountedPrice = currentPrice - (currentPrice * 0.1); // 10% de desconto
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

                if (!existingProduct.length) {
                    console.error("Produto não encontrado no banco de dados.");
                    continue; // Pular para o próximo produto se não for encontrado
                }


                const resultCalculatedNewPrice = calculateNewPrice(
                    productCode,
                    newPrice,
                    salesPrice,
                    costPrice
                );

                // console.log(
                //     "Product.log " +
                //         JSON.stringify(resultCalculatedNewPrice.status)
                // );


                // Atualizar o banco de dados com o novo preço
                switch (resultCalculatedNewPrice.status) {
                    case "error":
                        // console.log("Preço do produto " + productCode + " não atualizado. Motivo: " + resultCalculatedNewPrice.reason);
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
                            // console.log("Produto " + productCode + " atualizou o preço para " + newPrice)
                            
                        }
                        
                        
                        // if (resultCalculatedNewPrice.status != "error") {
                //     const updateSql =
                //         "UPDATE products SET sales_price = ? WHERE code = ?";
                //     await query(updateSql, [
                //         product.new_price,
                //         product.product_code,
                //     ]);
                //     console.log("Produto " + productCode + " atualizou o preço para " + newPrice)
                // } else {
                    //     console.log("Preço do produto " + productCode + " não atualizado. Motivo: " + resultCalculatedNewPrice.reason)
                    // }
                }
                console.log(productsError)
                console.log("----------------------------------------------------")
                console.log(productsSuccess)
                
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
