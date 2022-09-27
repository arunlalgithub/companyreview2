const express = require('express');
const router = express.Router()
const cors = require("cors");
const dotenv = require('dotenv');
const UserFile = require("../controller/user")
const { verifyToken } = require('../middleware/token')
const multer = require("multer");
const { upload } = require('../middleware/storage')
const app = express();
require('../model/config');
dotenv.config()


router.post("/signup", upload.single("profilepic"), UserFile.createUser)
router.post("/login", UserFile.Login)
router.get("/logout", UserFile.logout)
router.post('/reset-password', UserFile.resetUserPassword)
router.post('/new-password', UserFile.addNewPassword)
router.get('/refresh', UserFile.refreshToken)
module.exports = router;