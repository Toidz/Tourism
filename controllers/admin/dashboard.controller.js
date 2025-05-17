const AccountAdmin = require("../../models/account-admin.model")
module.exports.dashboard =  async (req,res)=>{
    res.render("admin/pages/dashboard",{
        pageTitle:"Trang tổng quan"
    })
}