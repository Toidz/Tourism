const Tour = require("../../models/tour.model")
const slugify = require("slugify")
const City = require("../../models/city.model")
module.exports.list = async (req,res)=>{
  const cityList = await City.find({})
  const find = {
    deleted:false,
    status:"active"
  }
  if(req.query.locationStart){
    find.locations = req.query.locationStart
  }
  if(req.query.locationEnd){
    const slug = slugify(req.query.locationEnd,{
      lower:true
    })
    const regex = new RegExp(slug)
    find.slug = regex
  }
  if(req.query.timeStart){
    find.departureDate = new Date(req.query.timeStart)
  }
  if(req.query.numberAdult){
    const adult ={}
    adult.$gte = req.query.numberAdult
    find.stockAdult= adult
  }
  if(req.query.numberChildren){
    const child ={}
    child.$gte = req.query.numberChildren
    find.stockChildren = child
  }
  if(req.query.numberBaby){
    const baby ={}
    baby.$gte=req.query.numberBaby
    find.stockBaby = baby
  }
  if(req.query.price){
    const price ={}
    switch (parseInt(req.query.price)) {
      case 0:
        price.$lte = 1000000
        break;
      case 1:
        price.$gte = 1000000
        price.$lte = 3000000
        break;
      case 3:
        price.$gte = 3000000
        price.$lte = 6000000
        break;
      case 6:
        price.$gte = 6000000
        price.$lte = 10000000
        break;
      case 10:
        price.$gte = 10000000
        break;
    }
    find.priceNewAdult = price
  }
  let total = 0
  const listTour = await Tour.find(find)
  if(listTour.length>0) total = listTour.length
  res.render("client/pages/search",{
    pageTitle:"Kết quả tìm kiếm",
    listTour:listTour,
    cityList:cityList,
    totalTour:total
  })
}