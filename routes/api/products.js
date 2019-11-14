const express = require("express");
const router = express.Router();
const productModel = require("../../models/products");



// 제품 불러오기
router.get("/", (req, res) => {

    productModel
        .find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json({
                msg : "successful total products",
                count : docs.length,
                productInfo : docs
            })
        })
        .catch(err => {
            res.status(500).json({
                error : err.message
            })
        });


});





// 제품 등록하기
router.post("/", (req, res) => {

    const product = new productModel({
        name : req.body.name,
        price : req.body.price
    });

    product
        .save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                msg : "successful save product",
                createdProduct : result
            })

        })
        .catch(err => {
           console.log(err.message);
           res.status(500).json({
               error : err.message
           })
        });




});



// 제품 수정하기
router.patch("/update", (req, res) => {
    res.json({
        "msg" : "제품 수정됨"
    })
});




//제품 삭제하기
router.delete("/delete", (req, res) => {
    res.json({
        "msg" : "제품 삭제됨"
    })
});



module.exports = router;