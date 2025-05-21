const router = require("express").Router();
const tourRouter = require("./tour.route");
const homeRouter = require("./home.route");
const cartRouter = require("./cart.route");
const contactRouter = require("./contact.route")
const infoMiddleware = require("../../middlewares/client/info.middleware")
const categoryMiddleware = require("../../middlewares/client/category.middleware")

router.use(infoMiddleware.info)
router.use(categoryMiddleware.category)

router.use("/tours",tourRouter);
router.use("/",homeRouter);
router.use("/cart",cartRouter);
router.use("/contact",contactRouter);
module.exports = router;
