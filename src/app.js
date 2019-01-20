const express = require('express') 
const app = express()
const path = require('path')
app.get('/',(req,res)=>{
    res.send('hello world')
})
//导入路由对象

const accountRouter = require(path.join(__dirname,'routers/accountRouter'))
app.use('/account',accountRouter)//设置路由
app.use(express.static(path.join(__dirname,'public')))//设置金静态资源目录
app.listen(8000,err=> console.log('runing...'))
