const Category = require("../../models/category.model")
const categoryHelper = require("../../helpers/category.helper")
module.exports.category = async (req,res,next)=>{
    const categoryList = await Category.find({
        deleted:false,
        status:"active"
    })
    const categoryTree = categoryHelper.categoryTree(categoryList)
    res.locals.categoryList = categoryTree;
    next()
}