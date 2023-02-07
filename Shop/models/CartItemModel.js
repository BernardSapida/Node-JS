const database = require('./../util/database');

class CartItem {
    constructor(id, quantity) {
        this.id = id;
        this.quantity = quantity;
    }
}

module.exports = {
    CartItem: CartItem
}