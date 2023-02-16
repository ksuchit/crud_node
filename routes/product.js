const router = require("express").Router();
const productController = require('../controllers/productController')

router.post("/",productController.product_create)
router.get("productId", productController.product_details) //get perticular single product

router.get("/",productController.product_all)
router.put("/:productId",productController.product_update)
router.delete("/:productId",productController.product_delete) 

module.exports=router 