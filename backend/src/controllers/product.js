const { query } = require("../config/database");

class Product {
    static async getProducts(req, res) { // Observe que adicionamos 'req' como primeiro parâmetro
        try {
            const sql = "SELECT * FROM products";
            const existingProducts = await query(sql);

            // Verifique se há produtos antes de retornar
            if (existingProducts.length > 0) {
                res.status(200).json({ products: existingProducts });
            } else {
                res.status(404).json({ message: "Nenhum produto encontrado." });
            }
        } catch (error) {
            console.error("Erro na validação/processamento do arquivo:", error);
            res.status(500).json({
                error: "Erro ao carregar arquivos",
            });
        }
    }
}

module.exports = Product;
