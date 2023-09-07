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
            const packsUpdated = [];
            const notFound = [];


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
                    notFound.push({status: "not_found", reason :  "Produto (product_code: " + productCode + ") não encontrado."});
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
                            
                        //Verifica se o produto é vendido em Packs
                        if (productPackId != null) {
                            //Pesquisa o Pack no banco de dados, 
                            const sql = "SELECT * FROM products WHERE code = ?";
                            const existingPack = await query(
                                sql,
                                productPackId
                            );

                            const pricePack = existingPack[0]["sales_price"];

                            const resultvarPricePack = varPricePack(salesPrice, newPrice, productPackQty);

                            const priceChangePacks = resultvarPricePack.priceChangePacks
                            const newPricePacks = priceChangePacks  + pricePack
                            //Atualiza no banco de dados, o novo valor do produto
                            const updateProduct =
                                "UPDATE products SET sales_price = ? WHERE code = ?";
                            await query(updateProduct, [
                                newPrice,
                                productCode,
                            ]);

                            //Atualiza no banco de dados, o novo valor do Pack
                            const updatePack =
                                "UPDATE products SET sales_price = ? WHERE code = ?";
                            await query(updatePack, [
                                newPricePacks,
                                productPackId,
                            ]);

                            packsUpdated.push({status: "success", productPackId :  productPackId,  productCode : productCode});


                        // Caso não seja vendido em pack, atualiza apenas o valor unitário do produto
                        } else {
                            
                            //Atualiza no banco de dados, o novo valor do produto
                            
                                const updateSql =
                                    "UPDATE products SET sales_price = ? WHERE code = ?";
                                await query(updateSql, [
                                    newPrice,
                                    productCode,
                                ]);
                        }

                        productsSuccess.push(resultCalculatedNewPrice);
                }
            }

            res.status(200).json({ message: "Preços atualizados com sucesso", productsSuccess : productsSuccess , packsUpdated : packsUpdated, notFound : notFound ,productsError : productsError});
        } catch (error) {
            console.error("Erro na validação/processamento do arquivo:", error);
            res.status(500).json({
                error: "Erro ao enviar os dados do arquivo",
            });
        }
    }
}

module.exports = PricingController;
