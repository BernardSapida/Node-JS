const ObjectId = require('mongodb').ObjectId;
const database = require('./../util/database');
const getDatabase = database.getDatabase;

class User {
    constructor(name, email, cart, id) {
        this.name = name;
        this.email = email;
        this.cart = cart;
        this.id = id;
    }

    save() {
        const db = getDatabase();
        const newUser = db.collection('users').insertOne(this);
        return newUser;
    }

    addToCart(product) {
        const db = getDatabase();
        const cartProductIndex = this.cart.items.findIndex(cartProduct => cartProduct.productId.toString() === product._id.toString());
        const updatedCartItems = [...this.cart.items];
        let newQuantity = 1;

        if(cartProductIndex != -1) {
            newQuantity += this.cart.items[cartProductIndex].quantity;
            updatedCartItems[cartProductIndex].quantity = newQuantity;
        } else {
            updatedCartItems.push({ productId: new ObjectId(product._id), quantity: 1});
        }

        const updatedCart = {
            items: updatedCartItems
        }

        return db.collection('users').updateOne(
            { _id: new ObjectId(this.id) },
            { $set: { cart: updatedCart } }
        )
    }

    static findById(id) {
        const db = getDatabase();
        const foundUser = db.collection('users').findOne({ _id: new ObjectId(id) }, { $set: this });
        return foundUser;
    }

    async getCart() {
        const db = getDatabase();
        const productIds = this.cart.items.map(item => item.productId);
        const products = await db.collection('products').find({ _id: { $in: productIds } }).toArray();

        return products.map(product => { 
            return {
                ...product, 
                quantity: this.cart.items.find(cartItem => cartItem.productId.toString() === product._id.toString()).quantity
            }
        });

        // Add functionality for the following
        // If the products is empty then your cart should be empty too.
        // The products in your cart should be matched to available products in shop.
    }

    deleteItemFromCart(productId) {
        const db = getDatabase();
        const updatedCartItems = this.cart.items.filter(item => item.productId.toString() !== productId.toString());
        db.collection('users').updateOne({ _id: new ObjectId(this.id) }, { $set: { cart: { items: updatedCartItems }} });
    }

    async getOrders() {
        const db = getDatabase();
        const orders = await db.collection('orders').find({ 'user.id': new ObjectId(this.id) }).toArray();
        return orders;
    }

    async addOrder() {
        const db = getDatabase();
        const products = await this.getCart();

        const order = {
            items: products,
            user: {
                id: new ObjectId(this.id),
                name: this.name,
            }
        }

        await db.collection('orders').insertOne(order);
        return db.collection('users').updateOne({ _id: new ObjectId(this.id) }, { $set: { cart: { items: [] } } });
    }
}

module.exports = {
    User: User
}