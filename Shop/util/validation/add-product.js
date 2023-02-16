let { body } = require('express-validator');

const validateProduct = () => {
    return [
        validateTitle(),
        validatePrice(),
        validateDescription()
    ];
}

const validateTitle = () => {
    return [
        body('title', 'Invalid product title!')
        .isLength({ min: 3 })
        .trim()
    ]
}

const validatePrice = () => {
    return [
        body('price', 'Invalid product price!')
        .isNumeric()
    ]
}

const validateDescription = () => {
    return [
        body('description', 'Product description is too short!')
        .isLength({ min: 5 })
        .trim()
    ]
}

module.exports = validateProduct;