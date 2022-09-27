const cors = require("cors");
const express = require('express');
const router = express.Router()
const company = require("../controller/company");
const { upload } = require('../middleware/storage')
const { verifyToken } = require('../middleware/token')
const  authorize =require('../middleware/authorize')
const Role = require('../middleware/Role');
const { createUser,
    Login,
    resetUserPassword,
    addNewPassword,
    refreshToken} = require('../routes/userRoutes')

router.post("/addcompany" ,upload.single("cmplogo") ,company.createCompany)
router.get("/companies" ,verifyToken, authorize(Role.User) , company.getCompany)
router.get("/search/:key", verifyToken, company.searchCompany)
router.post("/addreview", verifyToken, company.addReview)
router.get("/company/:key", verifyToken, company.companyDetail)

module.exports = router;