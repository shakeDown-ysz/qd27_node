//导包
const express = require('express')
const path = require('path')
//创建一个路由对象
const studentRouter = express.Router()
//导入路由模块   要交给谁出来
const studentController = require(path.join(__dirname,'../controllers/studentController'))

studentRouter.get('/list',studentController.getStudentPage)

module.exports = studentRouter