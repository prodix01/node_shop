const express = require("express");
const router = express.Router();

// 제품 불러오기
router.get("/test", (req, res) => {
    res.json({
        "msg":"제품 불러옴"
    })
});


// 제품 등록하기
router.post("/register", (req, res) => {

    const product = {
        email : req.body.email,
        password : req.body.password
    };

    res.json({
        msg : "제품 등록됨",
        userinfo: product
    })
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