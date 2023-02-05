const fs = require('fs');
const path = require('path');
const dataPath = path.join(
    path.dirname(require.main.filename),
    'data/cart.json'
);

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
}

module.exports = {
    cart: Cart
}