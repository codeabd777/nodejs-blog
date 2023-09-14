const express = require("express");
const router = express.Router();
//user controller
const { loadSignup, loadlogin, registervalidations, postRegister, postlogin, loginvalidations } = require("../controllers/userController")
const { stoplogin } = require('../middlewars/auth')

router.get("/", stoplogin, loadSignup)
router.get("/login", stoplogin, loadlogin)
router.post("/register", registervalidations, postRegister )
router.post("/postlogin", loginvalidations, postlogin)

module.exports = router;