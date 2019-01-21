const path = require('path')
const tpl = require('art-template')

const MongoClient = require('mongodb').MongoClient;
//获取数据库路径
const url = 'mongodb://localhost:27017';

// Database Name
//获取数据库名字
const dbName = 'szhmqd27';

exports.getStudentPage = (req, res) => {
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function (err, client) {
        console.log("Connected successfully to server");
        if (err) throw err
        //创建一个数据库的db对象
        const db = client.db(dbName);
        //拿到要操作的集合
        const keyword = req.query.keyword ||''
        const collection = db.collection('studentInfo');
        collection.find({name:{$regex:keyword}}).toArray((err, docs) => {
            console.log(docs);
            
            const html = tpl(path.join(__dirname, '../public/views/list.html'), {students:docs,keyword});
            res.send(html)
            client.close();
        })
    })
}

