const router = require("express").Router();
const tourRouter = require("./tour.route");
const homeRouter = require("./home.route");
const cartRouter = require("./cart.route");
const contactRouter = require("./contact.route")
const infoMiddleware = require("../../middlewares/client/info.middleware")
const categoryMiddleware = require("../../middlewares/client/category.middleware")
const searchRouter = require("./seach.route")
const orderRouter = require("./order.route")
router.use(infoMiddleware.info)
router.use(categoryMiddleware.category)

router.use("/tour",tourRouter);
router.use("/",homeRouter);
router.use("/cart",cartRouter);
router.use("/contact",contactRouter);
router.use("/search",searchRouter);
router.use("/order",orderRouter);
module.exports = router;
