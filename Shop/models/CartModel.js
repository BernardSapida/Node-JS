const fs = require('fs');
const path = require('path');
const dataPath = path.join(path.dirname(require.main.filename), 'data/cart.json');
const cartPath = path.join(path.dirname(require.main.filename), 'data/cart.json');

class Cart {
    static addProduct(id, productPrice) {
        // Fetch the previous cart
        fs.readFile(dataPath, (err, data) => {
            let cart = {
                products: {}, 
                totalPrice: 0
            }

            if (!err) cart = JSON.parse(data);

            // Analyze the cart => Find existing product
            const existingProduct = cart.products[id];

            // Add new product / increase quantity
            if(existingProduct) existingProduct.quantity++;
            else cart.products[id] = { quantity: 1 }
            
            cart.totalPrice += Number(productPrice);

            // Write a file and insert this data
            fs.writeFile(dataPath, JSON.stringify(cart), err => console.log(err));
        });
    }

    static deleteProduct(id, productPrice) {
        fs.readFile(cartPath, (err, data) => {
            data = JSON.parse(data);
            let product = data.products[id];

            if(!err && product) {
                data.totalPrice -= productPrice * product.quantity;
                delete data.products[id];
                fs.writeFile(cartPath, JSON.stringify(data), err => console.log(err));
            }
        });
    }

    static getCart(callback) {
        fs.readFile(cartPath, (err, data) => {
            const cart = JSON.parse(data);
            if (!err) callback(cart);
            else callback(null);
        });
    }
}

module.exports = {
    cart: Cart
}