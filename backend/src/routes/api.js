const express = require('express');
const router = express.Router();
const multer = require('multer');
const { validateAndProcessPricingFile } = require('../controllers/pricingController');
const { getProducts } = require('../controllers/product');

const upload = multer({ dest: 'uploads/' });

// Rota POST para processar o arquivo de preços
router.post('/pricing', upload.single('pricingFile'), validateAndProcessPricingFile);
router.get('/products', getProducts);


module.exports = router;