// const Product = require("../models/product");
const csvParser = require("../utils/csvParser");
const { query } = require("../config/database");
const { calculateNewPrice , varPricePack } = require("../controllers/functionsPricing"); //Importação das regras de negócio

class PricingController {
    static async validateAndProcessPricingFile(req, res, connection) {
        try {
            const filePath = req.file.path;
            const pricingData = await csvParser.parseCSV(filePath);

            const productsError = [];
            const productsSuccess = [];


            for (const product of pricingData) {
                // Consulta ao banco de dados para obter o produto com base no product_code
                
                const sql = "SELECT products.*, packs.pack_id, packs.qty FROM products LEFT JOIN packs ON products.code = packs.product_id WHERE products.`code` = ?";
                const existingProduct = await query(
                    sql,
                    [product.product_code]
                );

                const productCode = Number(product.product_code);
                const newPrice = Number(product.new_price);
                
                // Pular para o próximo produto se não for encontrado
                if (!existingProduct.length) {
                    console.error("Produto (product_code: " + productCode + ") não encontrado.");
                    continue; 
                }
                // TODO COntinuar mcom a lógica dos packs
                const salesPrice = existingProduct[0]["sales_price"];
                const costPrice = existingProduct[0]["cost_price"];
                const productPackId  = existingProduct[0]["pack_id"];
                const productPackQty  = existingProduct[0]["qty"];

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
                            
                        if (productPackId != null) {
            
                            const sql = "SELECT * FROM products WHERE code = ?";
                            const existingPack = await query(
                                sql,
                                productPackId
                            );

                            const pricePack = existingPack[0]["sales_price"];


                            console.log(existingPack)
                            console.log(pricePack)

                            const resultvarPricePack = varPricePack(salesPrice, newPrice, productPackQty);
                            console.log(resultvarPricePack)

                            const priceChangePacks = resultvarPricePack.priceChangePacks
                            const newPriceChangePacks = priceChangePacks  + pricePack

                            console.log(priceChangePacks)
                            console.log(newPriceChangePacks)




                        } else {
                            
                            // Verificar se existe um pack do produto
                            
                                // const updateSql =
                                //     "UPDATE products SET sales_price = ? WHERE code = ?";
                                // await query(updateSql, [
                                //     newPrice,
                                //     productCode,
                                // ]);
                        }

                        productsSuccess.push(resultCalculatedNewPrice);
                }
            }
            // console.log(productsError);
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
