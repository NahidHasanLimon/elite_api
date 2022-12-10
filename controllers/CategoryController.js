const Category = require('../models/Category');
const mongoose = require('mongoose')
const fs = require('fs');
const {validationErrorHumanify} = require('../utils/errorHandler');
const getAll = (async (req, res) => {
    try {
        const allCategory = await Category.find();
        return res.status(200).json(allCategory)
    } catch (error) {
        return res.status(400).json(validationErrorHumanify(error))
    }
})
const getCategory = (async (req, res) => {
    const clubID = (req.params.id)
    if (!mongoose.Types.ObjectId.isValid(clubID)) {
        return res.status(404).json({ msg: `Club not found with id :${clubID}`  });
    }
    try {
        let club = await Category.findById(clubID);
        if (club === null) {
           return res.status(404).json({ msg: `Club not found with id :${clubID}`  });
        } 
        return res.status(200).json(club)
    } catch (error) {
        return res.status(400).json(validationErrorHumanify(error))
    }
})
const  create = async (req, res) => {
    if(!req.body){
        return res.status(400).json('Name Field is Required') 
    }
    const filePath = `./temp/${req.body.gotCustomimageName}`;
    const filePathMove = `./static/images/${req.body.gotCustomimageName}`;
    console.log('Request body is: ', req.body)
    const newCategory = {
        name : req.body.name,
        slug : req.body.slug,
        image : req.body.gotCustomimageName ?? null,
    }
    try {
        let create = await Category.create(newCategory)
        fs.rename(filePath, filePathMove, function(err) {
            if ( err ) console.log('ERROR: ' + err);
            console.log('File Move Successfully.');
        });
        res.status(200).json(create)
    }catch(error){
        fs.unlinkSync(filePath);
        return res.status(400).json(validationErrorHumanify(error))
    }
}
const updateCategory = ( async (req, res) => {
    const clubID = (req.params.id)
    const filter = { _id: clubID };
    if (!mongoose.Types.ObjectId.isValid(clubID)) {
        return res.status(404).json({ msg: `Club not found with id :${clubID}`  });
    }
    const info = {...req.body}
    try {
        let club = await Category.findOneAndUpdate(filter, info, {
            new: true
          });
          if (club === null) {
            return res.status(404).json({ msg: `Club not found with id :${clubID}`  });
         }
          return res.status(200).json(club) 
          
    } catch (error) {
        return res.status(400).json(validationErrorHumanify(error))
    }
})

const deleteCategory = (async (req, res) => {
    let rMessage = {}
    const clubID = (req.params.id)
    if (!mongoose.Types.ObjectId.isValid(clubID)) {
        return res.status(404).json({ msg: `Club not found with id :${clubID}`  });
    }
    try {
        const deleteCategory = await Category.findByIdAndRemove(clubID);
        if(deleteCategory == null){
            return res.status(404).json('Failed to find Club by id: '+clubID)
        }
        rMessage['msg'] = 'Club deleted'
        rMessage['data'] = deleteCategory
        res.status(200).json(rMessage)
    } catch (error) {
        console.log(error)
        return res.status(400).json(validationErrorHumanify(error))
    }
   
})

module.exports = {
    getAll,
    getCategory,
    create,
    updateCategory,
    deleteCategory
}