const ObjectId = require('mongodb').ObjectId;
const database = require('./../util/database');
const getDatabase = database.getDatabase;

class Product {
    constructor(title, price, imageURL, description, id, userId) {
        this.title = title;
        this.price = price;
        this.imageURL = imageURL;
        this.description = description;
        this.id = id ? new ObjectId(id) : null;
        this.userId = userId ? new ObjectId(userId) : null;
    }

    save() {
        const db = getDatabase();

        if(this.id) {
            db.collection('products').updateOne({ _id: this.id }, { $set: this });
        } else {
            const newProduct = db.collection('products').insertOne(this);
            return newProduct;
        }
    }

    static fetchAll() {
        const db = getDatabase();
        const products = db.collection('products').find().toArray();
        return products;
    }

    static async findById(id) {
        const db = getDatabase();
        const product = await db.collection('products').find({ _id: new ObjectId(id) }).next();
        return product;
    }

    static async deleteById(id) {
        const db = getDatabase();
        await db.collection('products').deleteOne({ _id: new ObjectId(id) });
    }
}

module.exports = {
    Product: Product,
}