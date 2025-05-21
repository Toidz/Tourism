const Tour = require("../../models/tour.model")
const moment = require("moment")
const categoryHelper = require("../../helpers/category.helper")
module.exports.home = async (req,res) => {
    const listTour = await Tour.find({
      deleted:false,
      status:"active"
    })
    .limit(4)
    .sort({
      position:"desc"
    })
    for(const item of listTour){
      item.formatDepartureDate = moment(item.departureDate).format("DD-MM-YYYY")
    }
  
    const idParentVn = "6814c33c8a17e6a5efa03f8f"
    const arrayVn = await categoryHelper.categoryChild(idParentVn)
    const listTourVn = await Tour.find({
      category:{$in:arrayVn},
      deleted:false,
      status:"active"
    })
    .limit(4)
    .sort({
      position:"desc"
    })
    
    for(const item of listTourVn){
      item.formatDepartureDate = moment(item.departureDate).format("DD-MM-YYYY")
    }

    const idParentNn = "6814c3c4dbff8c3d84a5f6b7"
    const arrayNn = await categoryHelper.categoryChild(idParentNn)
    const listTourNn = await Tour.find({
      category:{$in:arrayNn},
      deleted:false,
      status:"active"
    })
    .limit(4)
    .sort({
      position:"desc"
    })
    
    for(const item of listTourNn){
      item.formatDepartureDate = moment(item.departureDate).format("DD-MM-YYYY")
    }

    res.render("client/pages/home",{
      pageTitle:"Trang chủ",
      listTour:listTour,
      listTourVn:listTourVn,
      listTourNn:listTourNn,
    });
  }