const express = require("express");
const router = express.Router();

const orderModel = require("../../models/orders");
const productModel = require("../../models/products");
const checkAuth = require("../../middleware/check_auth");
const orderController = require("../../controllers/orders");

//장바구니 불러오기
router.get("/", checkAuth, orderController.orders_get_all);

//상제 장바구니 제품 불러오기
router.get("/:order_id", checkAuth, orderController.orders_get_order);



//장바구니에 등록하기
router.post("/", checkAuth, orderController.orders_patch_order);




//주문현황 수정하기
router.patch("/:order_id", checkAuth, orderController.orders_patch_order);






//상세주문현황 삭제하기
router.delete("/:order_id", checkAuth, orderController.order_remove_order);



module.exports = router;