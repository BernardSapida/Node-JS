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
    constructor(id, title, description, image, price) {
        this.id = id;
        this.title = title;
        this.image = image;
        this.description = description;
        this.price = price;
    }

    save() {
        getProductsFromFile(productsList => {
            if(this.id) {
                const findProductIndex = productsList.findIndex(product => product.id == this.id);
                productsList[findProductIndex] = this;
                fs.writeFile(dataPath, JSON.stringify(productsList), err => console.log(err));
            } else {
                this.id = productsList.length + 1;
                productsList.push(this);
                fs.writeFile(dataPath, JSON.stringify(productsList), err => console.log(err));
            }
        });
    }

    static fetchAll(callback) {
        getProductsFromFile(callback);
    }

    static findById(id, callback) {
        getProductsFromFile(products => {
            const product = products.find(product => product.id == id);
            callback(product);
        });
    }
}

module.exports = {
    product: Product,
}