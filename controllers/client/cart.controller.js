const City = require("../../models/city.model")
const Tour = require("../../models/tour.model")
const moment = require("moment")
module.exports.cart = (req,res)=>{
    res.render("client/pages/cart",{
        pageTitle:"Trang giỏ hàng"
    });
}

module.exports.cartPost = async (req,res)=>{
    for (const item of req.body) {
        const tour = await Tour.findOne({
            _id:item.id,
            deleted:false,
            status:"active"
        })
        if(tour){
            item.avatar = tour.avatar
            item.name=tour.name
            item.slug = tour.slug
            item.departureDateFormat = moment(tour.departureDate).format("DD-MM-YYYY")
            const locationName = await City.findOne({
                _id:item.location
            })
            item.locationName = locationName.name
            item.priceNewAdult = tour.priceNewAdult
            item.priceNewChildren = tour.priceNewChildren
            item.priceNewBaby = tour.priceNewBaby
        }
        else{

            const indexItem = req.body.findIndex(tour => tour.id == item.id)
            req.body.splice(indexItem,1)
        }
    }
    res.json({
        code:"success",
        cart:req.body
    })
}