const Category = require("../models/category.model")
const categoryTree = (categoryList, idParent = "")=>{
    const tree = []
    categoryList.forEach(item => {
        if(idParent == item.parent){
            const children = categoryTree(categoryList,item.id);
            tree.push({
                id: item.id,
                name: item.name,
                slug: item.slug,
                children: children
        })}
            
    })
    return tree;
}
module.exports.categoryTree = categoryTree;

module.exports.categoryChild = async (idParent)=>{
    const childArray = [idParent]
    const findChild = async (idparent)=>{
        const childList = await Category.find({
            deleted:false,
            status:"active",
            parent: idparent
        })
        for(const item of childList){
            childArray.push(item.id)
            await findChild(item.id)
        }
    }
    await findChild(idParent)

    return childArray;
}
