const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://ZShop:ZShop1708131117@zshop.k1sczh5.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const dbConnection = async (callback) => {
    client.connect(err => {
        const collection = client.db("test").collection("devices");
        
        // perform actions on the collection object
        client.close();
    });

    callback(client);
}

module.exports = dbConnection;
