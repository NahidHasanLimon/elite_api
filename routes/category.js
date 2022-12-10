const express = require('express')
const router = express.Router()
const upload =  require('../imageHandler/upload'); 
const  { 
    getAll,
    getCategory,
    create,
    updateCategory,
    deleteCategory
} = require('../Controllers/CategoryController.js')

router.get('/', getAll)
router.get('/:id', getCategory)
router.post('/', upload, create) 
router.put('/:id', updateCategory) 
router.delete('/:id', deleteCategory)


module.exports = router