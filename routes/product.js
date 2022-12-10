const express = require('express')
const router = express.Router()
const upload =  require('../imageHandler/product'); 
const  { 
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductbySlug
} = require('../Controllers/ProductController.js')

router.get('/', getProducts)
router.get('/:id', getProduct)
router.get('/product-by-slug/:slug', getProductbySlug)
router.post('/',  upload ,createProduct) 

router.put('/:id', updateProduct) 
router.delete('/:id', deleteProduct)


module.exports = router