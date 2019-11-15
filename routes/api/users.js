const express = require("express");
const router = express.Router();
const userModel = require("../../models/users");

//나의 정보보기
router.get("/", (req, res) => {

    userModel
        .find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json({
                msg : "successful my page",
                count : docs.length,
                userInfo : docs
            });
        })
        .catch(err => {
            res.status(500).json({
                error : err.message
            });
        });

});






//나의 정보등록
router.post("/", (req, res) => {

    const user = new userModel({
        id : req.body.id,
        password : req.body.password
    });

    user
        .save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                msg: " successful save userInfo",
                createdUser : result
            });
        })
        .catch(err => {
            res.status(500).json({
                error : err.message
            });
        });
    }
);

// const product = new productModel({
//     name : req.body.name,
//     price : req.body.price
// });
//
// product
//     .save()
//     .then(result => {
//         console.log(result);
//         res.status(200).json({
//             msg : "successful save product",
//             createdProduct : result
//         })
//
//     })
//     .catch(err => {
//         console.log(err.message);
//         res.status(500).json({
//             error : err.message
//         })
//     });




//나의 정보수정
router.patch("/", (req, res) => {
        res.json({
            "msg" : "나의 정보수정"
        })
    }
);







//나의 정보삭제
router.delete("/", (req, res) => {
        res.json({
            "msg" : "나의 정보삭제"
        })
    }
);

module.exports = router;