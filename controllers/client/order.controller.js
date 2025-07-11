const Order = require("../../models/order.model")
const Tour = require("../../models/tour.model")
const City = require("../../models/city.model")
const moment = require("moment")
const slugify = require("slugify")
const variable = require("../../config/variable")
const generateHelper = require("../../helpers/generate.helper")
const CryptoJS = require("crypto-js");

module.exports.create = async (req,res)=>{
    try {
        const orderCode = "OD" + generateHelper.generateRandomNumber(8)
        for (const item of req.body.cart) {
            const tour = await Tour.findOne({
                _id:item.id,
                deleted:false,
                status:"active"
            })
            if(tour){
                item.name = tour.name
                item.avatar = tour.avatar
                item.departureDate = tour.departureDate
                item.priceNewAdult = tour.priceNewAdult
                item.priceNewChildren = tour.priceChildren
                item.priceNewBaby = tour.priceNewBaby
                if(item.stockAdult>tour.stockAdult 
                    || item.stockChildren >tour.stockChildren
                    || item.stockBaby > tour.stockBaby
                ){
                    res.json({
                        code:"error",
                        message:"Số lượng chỗ đã vượt quá số lượng còn lại!"
                    })
                    return
                }
                
                await Tour.updateOne({
                    _id: item.id
                },{
                    stockAdult : tour.stockAdult - item.stockAdult,
                    stockChildren : tour.stockChildren - item.stockChildren,
                    stockBaby : tour.stockBaby - item.stockBaby
                })
            }
        }
        req.body.priceTotal = req.body.cart.reduce((sum,item)=>{
            return sum + item.stockAdult *  item.priceNewAdult 
                + item.stockChildren *  item.priceNewChildren 
                + item.stockBaby *  item.priceNewBaby 
        },0)
        req.body.coupon = 0
        req.body.pricePay = req.body.priceTotal - req.body.coupon
        
        req.body.payStatus = "unpaid"
        req.body.status = "initial"
        req.body.orderCode = orderCode
        const dataFinal = new Order(req.body)
        await dataFinal.save()

        req.flash("success","Đặt tour thành công!")
        res.json({
            code:"success",
            orderId: dataFinal.id
        })
        
    } catch (error) {
        res.json({
            code:"error",
            message:"Đặt tour thất bại!"
        })
    }
}

module.exports.success = async (req,res)=>{
    const orderId = req.query.orderId
    const phone = req.query.phone
    const order = await Order.findOne({
        _id:orderId,
        phone:phone
    })
    const method = variable.method.find(item => item.value== order.method)
    order.methodName = method.lable

    const payStatus = variable.payStatus.find(item => item.value== order.payStatus)
    order.payStatusName = payStatus.lable

    const status = variable.status.find(item => item.value== order.status)
    order.statusName = status.lable

    order.createdAtFormat = moment(order.createdAt).format("HH:MM - DD/MM/YYYY")
    for (const item of order.cart) {
        item.slug = slugify(item.name)
        item.departureDateFormat = moment(item.departureDate).format("DD/MM/YYYY")
        const locationName = await City.findOne({
            _id: item.location
        })
        item.locationName = locationName
    }
    res.render("client/pages/order-success",{
        pageTitle:"Thông tin đơn hàng",
        order:order
    })
}

module.exports.zalopay = async (req,res)=>{

    try {
        const orderId = req.query.orderId
        console.log(orderId)
        const orderDetail = await Order.findOne({
            _id:orderId,
            deleted:false,
            payStatus:"unpaid"
        })
        if(!orderDetail){
            res.redirect("/")
            return
        }
    // Node v10.15.3
        const axios = require('axios').default; 
        const CryptoJS = require('crypto-js'); 
        const moment = require('moment'); 

        // APP INFO
        const config = {
            app_id: process.env.ZALOPAY_ID,
            key1: process.env.ZALOPAYKEY1,
            key2: process.env.ZALOPAYKEY2,
            endpoint: `${process.env.ZALOPAYDOMAIN}/v2/create`
        };

        const embed_data = {
            redirecturl:`${process.env.DOMAIN_WEBSITE}/order/success?orderId=${orderDetail.id}&phone=${orderDetail.phone}`
        };

        const items = [{}];
        const transID = Math.floor(Math.random() * 1000000);
        const order = {
            app_id: config.app_id,
            app_trans_id: `${moment().format('YYMMDD')}_${transID}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
            app_user: `${orderDetail.id}-${orderDetail.phone}`,//info
            app_time: Date.now(), // miliseconds
            item: JSON.stringify(items),
            embed_data: JSON.stringify(embed_data),
            amount: orderDetail.pricePay,//tong tien
            description: `Thanh toán đơn hàng #${orderDetail.orderCode}`,//mota
            bank_code: "",
            callback_url:`${process.env.DOMAIN_WEBSITE}/order/payment-zalopay-result`
        };

        // appid|app_trans_id|appuser|amount|apptime|embeddata|item
        const data = config.app_id + "|" + order.app_trans_id + "|" + order.app_user + "|" + order.amount + "|" + order.app_time + "|" + order.embed_data + "|" + order.item;
        order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

        const response =  await axios.post(config.endpoint, null, { params: order })

        // console.log(response.data);
        if(response.data.return_code==1){
            res.redirect(response.data.order_url)
        }
        else{
            res.redirect("/")
        }
    } catch (error) {
        res.redirect("/")
    }
}

module.exports.zalopayPost = async (req,res)=>{
    const config = {
    key2:  process.env.ZALOPAYKEY2
    };
    let result = {};

    try {
        console.log(1)
        let dataStr = req.body.data;
        let reqMac = req.body.mac;
        let mac = CryptoJS.HmacSHA256(dataStr, config.key2).toString();
        // kiểm tra callback hợp lệ (đến từ ZaloPay server)
        if (reqMac !== mac) {
        // callback không hợp lệ
        result.return_code = -1;
        result.return_message = "mac not equal";
        }
        else {
        // thanh toán thành công
        let dataJson = JSON.parse(dataStr, config.key2);
        const [orderId,phone] = dataJson.app_user.split("-");
 
        await Order.updateOne({
            _id: orderId,
            phone: phone,
            deleted: false
        },{
            payStatus: "paid"
        })

        result.return_code = 1;
        result.return_message = "success";
        }
  } catch (ex) {
    result.return_code = 0; // ZaloPay server sẽ callback lại (tối đa 3 lần)
    result.return_message = ex.message;
  }

  // thông báo kết quả cho ZaloPay server
  res.json(result);
}

module.exports.vnpay = async (req,res)=>{
    try {
        const orderId = req.query.orderId
        const orderDetail = await Order.findOne({
            _id:orderId,
            deleted:false,
            payStatus:"unpaid"
        })
        if(!orderDetail){
            res.redirect("/")
            return
        }

        console.log(orderDetail)
        let date = new Date();
        let createDate = moment(date).format('YYYYMMDDHHmmss');
        
        let ipAddr = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;

        let tmnCode = process.env.VNCODE
        let secretKey = process.env.VNKEY
        let vnpUrl = process.env.VNURL
        let returnUrl = `${process.env.DOMAIN_WEBSITE}/order/payment-vnpay-result`
        let orderIdVnpay = `${orderId}-${Date.now()}`;
        let amount = orderDetail.pricePay;
        let bankCode = ""
        
        let locale = "vn";
        let currCode = 'VND';
        let vnp_Params = {};
        vnp_Params['vnp_Version'] = '2.1.0';
        vnp_Params['vnp_Command'] = 'pay';
        vnp_Params['vnp_TmnCode'] = tmnCode;
        vnp_Params['vnp_Locale'] = locale;
        vnp_Params['vnp_CurrCode'] = currCode;
        vnp_Params['vnp_TxnRef'] = orderIdVnpay;
        vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderIdVnpay;
        vnp_Params['vnp_OrderType'] = 'other';
        vnp_Params['vnp_Amount'] = amount * 100;
        vnp_Params['vnp_ReturnUrl'] = returnUrl;
        vnp_Params['vnp_IpAddr'] = ipAddr;
        vnp_Params['vnp_CreateDate'] = createDate;
        if(bankCode !== null && bankCode !== ''){
            vnp_Params['vnp_BankCode'] = bankCode;
        }

        vnp_Params = sortObject(vnp_Params);

        let querystring = require('qs');
        let signData = querystring.stringify(vnp_Params, { encode: false });
        let crypto = require("crypto");     
        let hmac = crypto.createHmac("sha512", secretKey);
        let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex"); 
        vnp_Params['vnp_SecureHash'] = signed;
        vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

        res.redirect(vnpUrl)
    } catch (error) {
        res.redirect("/")
    }

}
module.exports.vnpayPost = async (req,res)=>{


}

function sortObject(obj) {
	let sorted = {};
	let str = [];
	let key;
	for (key in obj){
		if (obj.hasOwnProperty(key)) {
		str.push(encodeURIComponent(key));
		}
	}
	str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}
