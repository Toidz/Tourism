const Category = require("../../models/category.model");
const Tour = require("../../models/tour.model");
const City = require("../../models/city.model")
const categoryHelper = require("../../helpers/category.helper")
const moment = require("moment")
module.exports.tour = async (req, res) => {

  const cityList = await City.find({})
  const slug = req.params.slug
  const category = await Category.findOne({
    slug:slug,
    deleted:false,
    status:"active"
  })
  const bread = {
    image:category.avatar,
    title:category.name,
    desc:category.description,
    list:[
      {
      link:"/",
      name:"Trang chủ"
    }]
  }
  if(category.parent){
    const categoryParent = await Category.findOne({
      _id:category.parent,
      deleted:false,
      status:"active" 
    })
    bread.list.push({
      link:`/tour/${categoryParent.slug}`,
      name:categoryParent.name
    })
  }
  bread.list.push({
    link:`/tour/${category.slug}`,
    name:category.name
  })
  if(category){
    const idChild = await categoryHelper.categoryChild(category.id)
    const totalTour = await Tour.countDocuments({
      category:{$in:idChild}
    })
    const tourList = await Tour.find({
      category:{$in:idChild}
    });

    tourList.forEach(item => {
      item.formatDepartureDate = moment(item.departureDate).format("DD-MM-YYYY")
    });
    res.render("client/pages/tours",{
      pageTitle:"Danh sách tour",
      tourList: tourList,
      bread:bread,
      cityList:cityList,
      totalTour:totalTour
    });
  }
  else{
    res.redirect("/")
  }
}

module.exports.detail = async (req,res) =>{
  const slug = req.params.slug
  const tour = await Tour.findOne({
    slug:slug,
    deleted:false,
    status:"active"
  })
  if(tour){
    const cityList = await City.find({
      _id:{$in:tour.locations}
    })
    tour.formatDepartureDate = moment(tour.departureDate).format("DD-MM-YYYY")
    const category = await Category.findOne({
      _id:tour.category
    })
    const bread ={
      title:tour.name,
      image:tour.avatar,
      desc:tour.information,
      list:[
        {
        link:"/",
        name:"Trang chủ"
      }]
    }

    if(category.parent){
      const parent = await Category.findOne({
        _id:category.parent
      })
      bread.list.push({
        link:`/tour/${parent.slug}`,
        name:parent.name
      })
    }
    bread.list.push({
      link:`/tour/${category.slug}`,
      name:category.name
    })
    bread.list.push({
      link:`/tour/detail/${tour.slug}`,
      name:tour.name
    })
    res.render("client/pages/tour-detail",{
      pageTitle:"Chi tiết tour",
      category:category,
      bread:bread,
      tour:tour,
      cityList:cityList
    });
  }
  else{
    res.redirect("/")
  }
}
