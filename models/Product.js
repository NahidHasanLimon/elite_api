const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');


const ProductSchema = new mongoose.Schema({
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
    },
    name:{
        type: String,
        unique: true,
        required: true,
        maxLength:  [54, 'Maximum 54, got {VALUE}'],
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category',
    },
    slug:{
      type: String,
      unique: true,
      required: true,
      maxLength:  [54, 'Maximum 54, got {VALUE}'],
    },
    description:{
      type: String,
      required: true,
      maxLength:  [1000, 'Maximum 1000, got {VALUE}'],
    },
    thumbnail: {
        type: String,
        required: true
    },
    tags: [{
          type: String
      }],
    images: [{
        type: Object,
        // required: true
    }],
    technicalData: [{
      
    }],
    availabliltyOptions:{
      sizeWise:{
        type: Object,
        required: true
      },
  },
  status: {
    type : String,
    enum: ['active', 'inactive'],
    default : 'active',
},
  
   
      
})
ProductSchema.plugin(uniqueValidator);

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product