const AccountAdmin = require("../../models/account-admin.model")
const Order = require("../../models/order.model")
const variable = require("../../config/variable")
const moment = require("moment")
module.exports.dashboard =  async (req,res)=>{
    const dashboard ={
        account:0,
        order:0,
        totalPrice:0
    }
    const account = await AccountAdmin.countDocuments({
        status:"active"
    })
    if(account) dashboard.account = account

    const order = await Order.find({
        deleted:false
    })
    if(order) dashboard.order= order.length

    const totalPrice =  order.reduce((sum,item)=>{
        return sum + item.pricePay
    },0)
    if(totalPrice) dashboard.totalPrice = totalPrice

    const orderNew  = await Order.find({
        deleted:"false"
    })
    .limit(3)
    .sort({
        createdAt:"desc"
    })
    orderNew.forEach(order => {
       order.valueMethod= variable.method.find(item => item.value==order.method)
       order.valueStatusPay = variable.payStatus.find(item => item.value==order.payStatus)
       order.nameMethod=order.valueMethod.lable
       order.nameStatusPay =order.valueStatusPay.lable
       order.valueStatus = variable.status.find(item => item.value==order.status)
       order.nameStatus = order.valueStatus.lable
       order.formatTime = moment(order.createdAt).format("HH:mm")
       order.formatDay = moment(order.createdAt).format("DD/MM/YYYY")
    });
    res.render("admin/pages/dashboard",{
        pageTitle:"Trang tổng quan",
        dashboard:dashboard,
        orderNew:orderNew
    })
}

module.exports.revenueChart =  async (req,res)=>{
    const {
        currentMonth,
        currentYear,
        previousMonth,
        previousYear,
        arrayDay
    } = req.body

    const orderCurrent = await Order.find({
        deleted:false,
        createdAt:{
            $gte:new Date(currentYear,currentMonth-1,1),
            $lte:new Date(currentYear,currentMonth,1),

        }
    })

    const orderPrevious = await Order.find({
        deleted:false,
        createdAt:{
            $gte:new Date(previousYear,previousMonth-1,1),
            $lte:new Date(previousYear,previousMonth,1),

        }
    })

    const dataMonthCurrent = []
    const dataMonthPrevious = []

    for (const day of arrayDay) {
        let total =0
        for (const item of orderCurrent) {
            const orderDate = new Date(item.createdAt).getDate()
            if(day==orderDate){
                total += item.pricePay
            }
        }
        dataMonthCurrent.push(total)
    }

    for (const day of arrayDay) {
        let total =0
        for (const item of orderPrevious) {
            const orderDate = new Date(item.createdAt).getDate()
            if(day==orderDate){
                total += item.pricePay
            }
        }
        dataMonthPrevious.push(total)
    }

    res.json({
        code:"success",
        dataMonthCurrent:dataMonthCurrent,
        dataMonthPrevious:dataMonthPrevious
    })
}