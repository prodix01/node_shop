const express = require("express");
const router = express.Router();
const productModel = require("../../models/products");


// Data CRUD


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
                productInfo : docs.map(doc => {
                    return {
                        name: doc.name,
                        price: doc.price,
                        date: doc.createdAt,
                        req : {
                            type : "GET",
                            url : "http://localhost:3000/product/" + doc._id
                        }
                    }
                })


            });
        })
        .catch(err => {
            res.status(500).json({
                error : err.message
            });
        });


});


//상세제품 불러오기
router.get("/:product_id", (req, res) => {

    const id = req.params.product_id;
    productModel
        .findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
            if(doc) {
                return res.status(200).json({
                    msg : "successful get product",
                    productInfo : doc,
                    req : {
                        type : "GET",
                        url : "http://localhost:3000/product/"
                    }
                });
            }
            else {
                res.status(404).json({
                    msg : "No product"
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error : err.message
            });
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
                createdProduct : {
                    name : result.name,
                    price : result.price,
                    date : result.createdAt,
                    req : {
                        type : "GET",
                        url : "http://localhost:3000/product/" + result._id
                    }
                }
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
router.patch("/:product_id", (req, res) => {

    const id = req.params.product_id;

    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }


    productModel
        .update({ _id : id }, {$set : updateOps})
        .exec()
        .then(result => {
            res.status(200).json({
                msg : "updated product",
                productInfo : result
            });
        })
        .catch(err => {
            console.status(500).json({
                error : err.message
            });
        });



});




//제품 삭제하기
router.delete("/:product_id", (req, res) => {

    const id = req.params.product_id;
    productModel
        .remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                msg : "deleted product"
            });
        })
        .catch(err => {
            res.status(500).json({
                error : err.message
            });

        });



});



module.exports = router;