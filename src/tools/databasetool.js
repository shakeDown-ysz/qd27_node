/**
 * 
 * @param {String} collectionName  要操作的集合名字 
 * @param {String} CRUD    findOne/insertOne
 * @param {Object} data    数据 
 * @param {Function} callback  获得结果之后的回调
 */
const operationMongodb = (collectionName,CRUD,data,callback) => {
    const MongoClient = require('mongodb').MongoClient;
    const url = 'mongodb://localhost:27017';
    const dbName = 'szhmqd27';
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function (err, client) {
        if (err) throw err
        //创建一个数据库的db对象
        const db = client.db(dbName);
        //拿到要操作的集合
        const collection = db.collection(collectionName);

        if(CRUD=='findOne'){
            collection.findOne(data, (err, doc) => {
                client.close();
                callback(err, doc)
            })
        }else if(CRUD=='find'){
            collection.find(data.toArray, (err, doc) => {
                client.close();
                callback(err, doc)
            })
        }else if(CRUD=='insertOne'||'insertMany'){
            collection.insertMany(data, (err, doc) => {
                client.close();
                callback(err, doc)
            })
        }else if(CRUD=='updateOne'||'updateMany'){
            collection.updateMany(data, (err, doc) => {
                client.close();
                callback(err, doc)
            })
        }else if(CRUD=='deleteOne'||'deleteMany'){
            collection.deleteMany(data, (err, doc) => {
                client.close();
                callback(err, doc)
            })
        }
    })
}





module.exports = operationMongodb