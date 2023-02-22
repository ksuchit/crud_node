const router = require("express").Router();
const productController = require('../controllers/productController')
const operations = require('../controllers/opeartions');
const { register, login, deleteUser } = require("../controllers/authController");
const verifyToken = require("../middleware/verifyToken");


router.post("/",productController.product_create)
router.get("/:productId", productController.product_details) //get perticular single product
router.get("/",verifyToken, productController.product_all)
router.put("/:productId",productController.product_update)
router.delete("/:productId",productController.product_delete) 

// operations
// router.get("/sortby/",operations.sortBy)
router.post('/auth/registration',register)
router.post('/auth/login', login)
router.delete('/remove-user/:userId',deleteUser)
module.exports=router 