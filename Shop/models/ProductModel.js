const fs = require('fs');
const path = require('path');
const dataPath = path.join(
    path.dirname(require.main.filename),
    'data/products.json'
);

const getProductsFromFile = callback => {
    return fs.readFile(dataPath, (err, data) => {
        if (err) callback([]);
        else callback(JSON.parse(data));
    });
}

class Product {
    constructor(title, description, image, price) {
        this.title = title;
        this.description = description;
        this.image = image;
        this.price = price;
    }

    save() {
        getProductsFromFile(productsList => {
            productsList.push(this);
            fs.writeFile(dataPath, JSON.stringify(productsList), err => console.log(err));
        })
    }

    static fetchAll(callback) {
        getProductsFromFile(callback);
    }
}

module.exports = {
    product: Product,
}