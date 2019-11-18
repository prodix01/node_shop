

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


    userModel
        // 사용자 입력 이메일
        .find({ email : req.body.email })
        .exec()
        .then(user => {
            // 메일이 있을경우
            if (user.length >= 1) {
                return res.status(404).json({
                    msg : "Mail exists"
                });
            }
            else {

                // 메일이 없을경우
                // 패스워드 암호화
                bcrypt.hash(req.body.password, 10, (err, hash) => {

                    if (err) {
                        return res.status(500).json({
                            error : err.message
                        });
                    }

                    // db에 저장
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

            }
        })
        .catch(err => {
            res.status(500).json({
                error : err.message
            });
        });

});


// 로그인
router.post("/login", (req, res) => {

    //로그인을 위한 정보매칭
    userModel
        .findOne({email : req.body.email})
        .exec()
        .then(user => {

        })
        .catch(err => {
            res.status(500).json({
                error : err.message
            });
        });

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