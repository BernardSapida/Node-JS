const database = require('./../util/database');

class Order {
    constructor(id) {
        this.id = id;
    }
}

module.exports = {
    Order: Order
}