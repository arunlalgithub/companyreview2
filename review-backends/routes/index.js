const express = require('express');
const router = express.Router()
const companyRouter = require('./companyRoutes')
const userRouter = require('./userRoutes')

router.use('/',companyRouter)
router.use('/',userRouter)

module.exports =router