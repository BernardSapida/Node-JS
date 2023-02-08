const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://ZShop:ZShop123@zshop.k1sczh5.mongodb.net/?retryWrites=true&w=majority";
const mongoClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
let db;

const MongoConnect = async (callback) => {
    const client = await mongoClient.connect();
    db = client.db("ZShop");
    callback();
}

const getDatabase = () => db ? db : 'No database found!';

module.exports = {
    MongoConnect: MongoConnect,
    getDatabase: getDatabase
};
