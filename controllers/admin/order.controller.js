module.exports.edit = (req,res)=>{
    res.render("admin/pages/order-edit",{
        pageTitle:"Đơn hàng: OD000001"
    })
}
module.exports.list = (req,res)=>{
    res.render("admin/pages/order-list",{
        pageTitle:"Quản lý đơn hàng"
    })
}