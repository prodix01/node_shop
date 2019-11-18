

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");


const userModel = require("../../models/users");




//전체 유저 정보보기
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






//회원가입
router.post("/register", (req, res) => {

    bcrypt.hash(req.body.password, 10, (err, hash) => {

        if (err) {
            return res.status(500).json({
                error : err.message
            });
        }

        const user = new userModel({
            email : req.body.email,
            password : hash
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

    });





});


// 로그인
router.post("/login", (req, res) => {



});



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