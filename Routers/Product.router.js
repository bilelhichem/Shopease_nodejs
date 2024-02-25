const router = require('express').Router();
const ProductController = require('../Controllers/Product.controller');

router.post('/api/AjouterProduct',ProductController.AjouterProduct);
router.post('/api/DeleteProd',ProductController.DeleteProd);

router.post('/api/UploadPro',ProductController.UploadPro)

module.exports = router;