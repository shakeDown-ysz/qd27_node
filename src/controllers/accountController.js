//控制器
//导包 
const path = require('path')
const MongoClient = require('mongodb').MongoClient;
const captchapng = require('captchapng');

// Connection URL
//获取数据库路径
const url = 'mongodb://localhost:27017';

// Database Name
//获取数据库名字
const dbName = 'szhmqd27';

exports.getRegisterPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views/register.html'))
}


exports.register = (req, res) => {

    //获取用户名
    const {
        username
    } = req.body

    console.log(username);
    //连接数据库
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function (err, client) {
        console.log("Connected successfully to server");
        if (err) throw err
        //创建一个数据库的db对象
        const db = client.db(dbName);
        //拿到要操作的集合
        const collection = db.collection('accountInfo');
        const result = {
            status: 0,
            message: '注册成功'
        }
        // 判断用户名是否存在  
        collection.findOne({
            username
        }, (err, doc) => {
            if (err) throw err
            console.log(doc)
            if (doc) {
                //存在
                result.status = 1
                result.message = '用户名已存在'
                res.json(result)
                //关闭数据库
                client.close();
            } else {
                //不存在
                collection.insertOne(req.body,
                    (err, result2) => {
                        res.json(result)
                        //关闭数据库
                        client.close();
                    }
                )
            }
        })
    })
}

exports.getloginPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views/login.html'))
}
//处理验证码图片
exports.vcode = (req, res) => {
    const vcode = parseInt(Math.random() * 9000 + 1000);
    console.log(vcode);
    req.session.vcode = vcode
    const p = new captchapng(80, 30, vcode); // width,height,numeric captcha
    p.color(0, 0, 0, 0); // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)

    var img = p.getBase64();
    var imgbase64 = new Buffer(img, 'base64');
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    res.end(imgbase64);
}

exports.login = (req, res) => {
    const {
        username,
        password,
        userVcode: userVcode
    } = req.body
    const result = {
        status: 0,
        message: '登陆成功'
    }
    const serverVcode = req.session.vcode
    console.log('serverVcode is' + serverVcode);
    console.log('userVcode is' + userVcode);
    //判断验证码是否正确
    if (userVcode != serverVcode) {
        result.status = 2
        result.message = '验证码错误'
        res.json(result)
        return
    } else {
        collection.findOne({
            username: username,
            password: password
        }, (err, doc) => {
            if (doc) {
                res.json(result)
                client.close();
            } else {
                result.status = 1
                result.message = '账号或密码错误'
                res.json(result)
                client.close();
            }
        })
    }
}