const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cart: {
        items: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true
                }
            }
        ]
    }
});

userSchema.methods.addToCart = function(product) {
    const cartProductIndex = this.cart.items.findIndex(cartProduct => cartProduct.product.toString() === product._id.toString());
    const updatedCartItems = [...this.cart.items];
    let newQuantity = 1;

    if(cartProductIndex != -1) {
        newQuantity += this.cart.items[cartProductIndex].quantity;
        updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
        updatedCartItems.push({ product: product._id, quantity: newQuantity });
    }

    const updatedCart = { items: updatedCartItems }
    this.cart = updatedCart;
    return this.save();
}

userSchema.methods.deleteItemFromCart = function(id) {
    const updatedCartItems = this.cart.items.filter(item => item.product.toString() !== id.toString());
    this.cart.items = updatedCartItems;
    this.save();
}

const User = mongoose.model('User', userSchema);

module.exports = {
    User
};

// class User {
//     static findById(id) {
//         const db = getDatabase();
//         const foundUser = db.collection('users').findOne({ _id: new ObjectId(id) }, { $set: this });
//         return foundUser;
//     }

    

//     async getOrders() {
//         const db = getDatabase();
//         const orders = await db.collection('orders').find({ 'user.id': new ObjectId(this.id) }).toArray();
//         return orders;
//     }

//     async addOrder() {
//         const db = getDatabase();
//         const products = await this.getCart();

//         const order = {
//             items: products,
//             user: {
//                 id: new ObjectId(this.id),
//                 name: this.name,
//             }
//         }

//         await db.collection('orders').insertOne(order);
//         return db.collection('users').updateOne({ _id: new ObjectId(this.id) }, { $set: { cart: { items: [] } } });
//     }
// }