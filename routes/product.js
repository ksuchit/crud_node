const router = require("express").Router();
const productController = require('../controllers/productController')
const operations = require('../controllers/opeartions')

router.post("/",productController.product_create)
router.get("/:productId", productController.product_details) //get perticular single product
router.get("/",productController.product_all)
router.put("/:productId",productController.product_update)
router.delete("/:productId",productController.product_delete) 

// operations
// router.get("/sortby/",operations.sortBy)

module.exports=router 