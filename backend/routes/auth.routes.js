
const express = require('express');
const router = express.Router();

const {signUp,login, getUser,logout} = require("../controllers/auth.controller.js");
const {auth} = require("../middlewares/auth.js")



router.post("/create-account",signUp);

router.post("/login", login);

router.get("/get-user",auth,getUser);

router.get("/logout",auth,logout);




module.exports = router;
