const express = require("express");
const router = express.Router();

const orderModel = require("../../models/orders");
const productModel = require("../../models/products");


//주문현황 불러오기
router.get("/", (req, res) => {
    orderModel
        .find()
        .populate("product", "name price")
        .exec()
        .then(docs => {
            res.status(200).json({
                msg : "successful total orders",
                count : docs.length,
                orderList : docs
            });
        })
        .catch(err => {
            res.status(500).json({
                error : err.message
            });
        });
});

//상제 장바구니 제품 불러오기
router.get("/:order_id", (req, res) => {

    const id = req.params.order_id;
    orderModel
        .findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
            if(doc){
                res.status(200).json({
                    msg : "successful get order",
                    orderInfo : doc
                });
            }
            else {
                res.status(400).json({
                    msg : "No orderInfo"
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error : err.message
            });
        });
});



//주문현황 등록하기
router.post("/", (req, res) => {

    productModel
        .findById(req.body.productId)
        .then(product => {
            // 제품아이디 유무 체크
            if(!product) {
                return res.status(404).json({
                    msg : "No product id"
                });
            }
            else {
                const order = new orderModel({
                    product : req.body.productId,
                    quantity: req.body.quantity
                });

                return order.save()
            }
        })
        .then(result => {
            console.log(result);
            res.status(200).json({
                msg : "order stored",
                orderInfo : result
            });
        })
        .catch(err => {
            res.status(500).json({
                error : err.message
            });
        });


});

//









//주문현황 수정하기
router.patch("/", (req, res) => {

});







//상세주문현황 삭제하기
router.delete("/:order_id", (req, res) => {
    const id = req.params.order_id;
    orderModel
        .remove({_id : id})
        .exec()
        .then(result => {
            res.status(200).json({
                msg : "deleted order"
            });
        })
        .catch(err => {
            res.status(500).json({
                error : err.message
            });
        });


});



module.exports = router;