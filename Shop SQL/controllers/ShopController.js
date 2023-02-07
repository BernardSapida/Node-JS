const ProductModel = require('../models/ProductModel');
const Product = ProductModel.Product;

const getIndex = async (req, res, next) => {
    const productsList = await Product.findAll();

    res.render('shop/index', {
        pageTitle: 'Shop',
        productsList: productsList,
        path: '/'
    });
};

const getProducts = async (req, res, next) => {
    const productsList = await Product.findAll();

    res.render('shop/product-list', {
        pageTitle: 'All Products',
        productsList: productsList,
        path: '/products'
    });
};

const getProduct = async (req, res, next) => {
    const id = req.params.id;
    const product = await Product.findByPk(id);

    res.render('shop/product-detail', {
        pageTitle: 'View Product',
        product: product,
        path: '/products'
    });
}

const getCart = async (req, res, next) => {
    const cart = await req.user.getCart();
    const cartProducts = await cart.getProducts();

    console.log(cartProducts)

    res.render('shop/cart', {
        pageTitle: 'My Cart',
        cartProducts: cartProducts,
        path: '/cart' 
    });
}

const postCart = async (req, res, next) => {
    const id = req.body.id;
    const cart = await req.user.getCart();
    const fetchedCart = cart;
    const products = await cart.getProducts({ where: { id: id } });
    let newQuantity = 1;

    if(products.length > 0) {
        const product = products[0];
        const oldQuantity = product.cartitem.dataValues.quantity;
        newQuantity += oldQuantity;
    }

    const product = await Product.findByPk(id);
    await fetchedCart.addProduct(product, { through: { quantity: newQuantity } });
    res.redirect('/cart');
}

const postCartDeleteItem = async (req, res, next) => {
    const id = req.body.id;
    const cart = await req.user.getCart();
    const products = await cart.getProducts({ where: { id: id } });
    const product = products[0];
    
    product.cartitem.destroy();
    res.redirect('/cart');
};

const getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: 'Checkout',
        path: '/checkout'
    });
}

const postOrder = async (req, res, next) => {
    const cart = await req.user.getCart();
    const fetchedCart = cart;
    const products = await cart.getProducts();
    const order = await req.user.createOrder(); 

    await order.addProduct(products.map(product => {
        product.orderitem = { quantity: product.cartitem.dataValues.quantity };
        return product;
    }));

    await fetchedCart.setProducts(null);
    res.redirect('/orders')
}

const getOrders = async (req, res, next) => {
    const orders = await req.user.getOrders({ include: ['products']});

    orders.forEach(order => {
        console.log(order.id)
        console.log(order)
    })

    res.render('shop/orders', {
        pageTitle: 'My Orders',
        orders: orders,
        path: '/orders'
    });
}

module.exports = {
    getIndex: getIndex,
    getProducts: getProducts,
    getProduct: getProduct,
    getCart: getCart,
    postCart: postCart,
    postCartDeleteItem: postCartDeleteItem,
    postOrder: postOrder,
    getOrders: getOrders,
    getCheckout: getCheckout
}