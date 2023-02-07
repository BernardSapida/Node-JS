const database = require('./../util/database');

class Product {
    constructor(title, price, imageURL, description) {
        this.title = title;
        this.price = price;
        this.imageURL = imageURL;
        this.description = description;
    }
}

module.exports = {
    Product: Product,
}