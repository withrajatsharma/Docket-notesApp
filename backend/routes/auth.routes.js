
const express = require('express');
const router = express.Router();

const {signUp,login, getUser} = require("../controllers/auth.controller.js");
const { authenticateToken } = require('../utilities.js');



router.post("/create-account",signUp);

router.post("/login", login);

router.get("/get-user",authenticateToken,getUser);


module.exports = router;
