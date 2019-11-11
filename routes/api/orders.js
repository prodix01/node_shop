const express = require("express");
const router = express.Router();


router.get("/order", (req, res) => {
   res.json({
       "msg": "내 주문 현황"
   })
});


module.exports = router;