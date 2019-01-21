const express = require('express')
const path = require('path')
//创建一个路由对象
const accountRouter = express.Router()
//导入控制器模块
const accountController = require(path.join(__dirname,'../controllers/accountController.js'))


accountRouter.get('/register',accountController.getRegisterPage)

accountRouter.post('/register',accountController.register) 
accountRouter.get('/login',accountController.getloginPage) 
accountRouter.get('/vcode',accountController.vcode) 
accountRouter.post('/login',accountController.login)

module.exports = accountRouter
