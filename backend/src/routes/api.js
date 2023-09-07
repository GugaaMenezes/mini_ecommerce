const express = require('express');
const router = express.Router();
const multer = require('multer');
const { validateAndProcessPricingFile } = require('../controllers/pricingController');

const upload = multer({ dest: 'uploads/' });

// Rota POST para processar o arquivo de preços
router.post('/pricing', upload.single('pricingFile'), validateAndProcessPricingFile);

module.exports = router;