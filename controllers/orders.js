const orderModel = require("../models/orders");
const productModel = require("../models/products");


//장바구니 전체 불러오기
exports.orders_get_all = (req, res) => {
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
};

//상세 장바구니 불러오기

exports.orders_get_order = (req, res) => {

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
};

//장바구니에 등록하기
exports.orders_post_order = (req, res) => {

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


};

//장바구니 제품 수정하기
exports.orders_patch_order = (req, res) => {

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

};




//장바구니 제품 삭제하기
exports.order_remove_order = (req, res) => {
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


};

