const express = require("express");
const router = express.Router();

const orderModel = require("../../models/orders");
const productModel = require("../../models/products");
const checkAuth = require("../../middleware/check_auth");

//장바구니 불러오기
router.get("/", checkAuth, (req, res) => {
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
router.get("/:order_id", checkAuth, (req, res) => {

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



//장바구니에 등록하기
router.post("/", checkAuth, (req, res) => {

    productModel
        .findById(req.body.product)
        .then(product => {
            // 제품아이디 유무 체크
            if(product) {
                const order = new orderModel({
                    product : req.body.product,
                    quantity: req.body.quantity
                });

                return order.save()
            }
            else {

                return res.status(404).json({
                    msg : "No product id"
                });
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
router.patch("/:order_id", checkAuth, (req, res) => {

    const id = req.params.order_id;

    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    orderModel
        .update({ _id : id }, {$set : updateOps})
        .exec()
        .then(result => {
            res.status(200).json({
                msg : "update order",
                orderInfo : result
            });
        })
        .catch(err => {
            res.status(500).json({
                error : err.message
            });
        });

});






//상세주문현황 삭제하기
router.delete("/:order_id", checkAuth, (req, res) => {
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