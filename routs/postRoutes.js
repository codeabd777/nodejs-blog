const express = require("express");
const router = express.Router();

const { postForm, storePost } = require("../controllers/postsController")
const { auth } = require("../middlewars/auth")

router.get('/createPost', auth, postForm)
router.post('/createPost', auth, storePost)

module.exports = router;