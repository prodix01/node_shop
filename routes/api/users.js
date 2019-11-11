const express = require("express");
const router = express.Router();


router.get("/user", (req, res) => {
    res.json({
        "msg" : "나의 정보"
    })
    }
);


module.exports = router;