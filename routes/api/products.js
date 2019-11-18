const express = require("express");
const router = express.Router();

const checkauth = require("../../middleware/check_auth");


const productController = require("../../controllers/products");

// Data CRUD


// 제품 불러오기
router.get("/", productController.products_get_all);


//상세제품 불러오기
router.get("/:product_id", checkauth, productController.products_get_product);




// 제품 등록하기
router.post("/", checkauth, productController.products_post_product);



// 제품 수정하기
router.patch("/:product_id", checkauth, productController.products_patch_product);




//제품 삭제하기
router.delete("/:product_id", checkauth, productController.products_remove_product);



module.exports = router;