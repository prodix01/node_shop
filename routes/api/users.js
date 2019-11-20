

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
        // 이메일 매칭
        .find({email : req.body.email})
        .exec()
        .then(user => {
            //이메일이 없을경우
            if (user.length < 1) {
                return res.status(401).json({
                    msg : "No email"
                });
            }
            //이메일이 있는경우
            else {
                //패스워드 매칭
                bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                    console.log(result);
                    if (result === false) {
                        return res.json({
                            msg : "password is not matched"
                        });
                    }
                    else {

                        const token = jwt.sign({
                            email : user[0].email,
                            userId : user[0]._id
                        },
                        process.env.JWT_SECRET, { expiresIn : "1h" });

                        res.status(200).json({
                            msg : "successful login",
                            tokenInfo : "bearer "+token
                        });
                    }
                })
            }



        })
        .catch(err => {
            res.status(500).json({
                error : err.message
            });
        });

});



//나의 정보수정
router.patch("/:user_id", (req, res) => {

    const id = req.params.user_id;

    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    userModel
        .update({ _id : id }, {$set : updateOps})
        .exec()
        .then(result => {
            res.status(200).json({
                msg : "successful update userInfo",
                userInfo : result
            });
        })
        .catch(err => {
            res.status(500).json({
                error : err.message
            });
        });

});







//나의 정보삭제
router.delete("/:user_id", (req, res) => {

    const id = req.params.user_id;
    userModel
        .remove({ _id : id })
        .exec()
        .then(result => {
            res.status(200).json({
                msg : "successful remove userData"
            })
        })
        .catch(err => {
            res.status(500).json({
                error : err.message
            });
        });

});

module.exports = router;