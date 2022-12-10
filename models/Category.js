const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');
const CategorySchema = new mongoose.Schema({
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
    },
    name: {
        type: String,
        required: [true, "name required."],
        unique: true,
        maxLength:  [54, 'Maximum 54, got {VALUE}'],
    },
    slug:{
      type: String,
      unique: true,
      required: true,
      maxLength:  [54, 'Maximum 54, got {VALUE}'],
    },
    image: {
      type: String,
      required: false
    },
  
    
})

const Category = mongoose.model('Category', CategorySchema)

module.exports = Category