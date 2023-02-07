const database = require('./../util/database');

class OrderItem {
    constructor(id, quantity) {
        this.id = id;
        this.quantity = quantity;
    }
}

module.exports = {
    OrderItem: OrderItem
}