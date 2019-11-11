const express = require("express");
const router = express.Router();

//나의 정보보기
router.get("/user", (req, res) => {
    res.json({
        "msg" : "나의 정보"
    })
    }
);

//나의 정보등록
router.post("/", (req, res) => {
        res.json({
            "msg" : "나의 정보등록"
        })
    }
);
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