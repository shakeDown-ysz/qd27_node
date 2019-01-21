const express = require('express') 

const path = require('path')   
const bodyParser = require('body-parser')//获取post参数中间件
const session = require('express-session')//  设置session中间件 
//创建一个app    原生叫创建服务
const app = express()
//body-parser 设置参数
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//session  中间件
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))
//指定一个静态资源目录 开放出来
app.use(express.static(path.join(__dirname,'public')))//设置金静态资源目录


//导入路由对象
const accountRouter = require(path.join(__dirname,'routers/accountRouter'))

// 将一级路径分配给对应的路由处理
app.use('/account',accountRouter)//设置路由

app.listen(8000,err=> console.log('runing...'))
