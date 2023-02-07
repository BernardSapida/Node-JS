const database = require('./../util/database');

class Cart {
    constructor(id) {
        this.id = id;
    }
}

module.exports = {
    Cart: Cart
}