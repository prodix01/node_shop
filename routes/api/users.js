

const express = require("express");
const router = express.Router();


const userController = require("../../controllers/users");




//전체 유저 정보보기
router.get("/", userController.user_get_all);



//회원가입
router.post("/register", userController.user_post_register);


// 로그인
router.post("/login", userController.user_post_login);



//나의 정보수정
router.patch("/:user_id", userController.user_update_user);



//나의 정보삭제
router.delete("/:user_id", userController.user_remove_user);

module.exports = router;