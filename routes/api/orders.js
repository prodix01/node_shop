const express = require("express");
const router = express.Router();

//주문현황 불러오기
router.get("/", (req, res) => {
   res.json({
       "msg": "내 주문 현황"
   })
});

//주문현황 등록하기
router.post("/", (req, res) => {
    res.json({
        "msg": "내 주문 현황 등록"
    })
});
//주문현황 수정하기
router.patch("/", (req, res) => {
    res.json({
        "msg": "내 주문 현황 수정"
    })
});
//주문현황 삭제하기
router.delete("/", (req, res) => {
    res.json({
        "msg": "내 주문 현황 삭제"
    })
});

module.exports = router;