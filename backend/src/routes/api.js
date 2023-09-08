const express = require('express');
const router = express.Router();
const multer = require('multer');
const { validateAndProcessPricingFile } = require('../controllers/pricingController');
const { getProducts } = require('../controllers/product');
const upload = multer({ dest: 'uploads/' });


/**
 * @swagger
 * /api/pricing:
 *   post:
 *     summary: Envio de arquivo com novos preços, formato .csv.
 *     responses:
 *       200:
 *         description: Rota POST para processar o arquivo de preços.
 */
// Rota POST para processar o arquivo de preços
router.post('/pricing', upload.single('pricingFile'), validateAndProcessPricingFile);



/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Retorna uma lista de produtos cadastrados.
 *     responses:
 *       200:
 *         description: Lista de produtos cadastrados.
 */
router.get('/products', getProducts);




module.exports = router;