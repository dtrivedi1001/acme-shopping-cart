const mongoose = require('mongoose');
require("../model/cart")
require("../model/inventory")

exports.getCart = async function(req, res) {
    Cart.find({}).populate({ path: 'productId', model: 'inventory'}).exec(function (err, items) {
        if (err) {
            console.error(err.message);
            res.status(500).send('Server Error')
        }
        var itemsMap = {};
        items.forEach(function(item) {
            itemsMap[item._id] = item;
        });
        res.status(200).send(itemsMap);  
      });
};

exports.getCartCount = async function(req, res) {
    Cart.countDocuments({}, function(err, items) {
        if (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
        console.log(items);
        res.json({ count: items});
    });
};

exports.clearCart = async function(req, res) {
    await mongoose.connection.db.listCollections({name: Cart.collection.name})
    .next(function(err, collinfo) {
        if (collinfo) {
            Cart.collection.drop();
        }
    });
    return res.status(200).send("Cart cleared");
};

exports.addItemToCart = async function(req, res) {

    var inventory = await Inventory.findById(req.params.id);
    if (inventory === null) {
        res.status(400).send("Invalid product Id");
    }
    var query = {productId : req.params.id};
    var cartItem = await Cart.findOne(query);
    if (cartItem !== null) {
        if (inventory.quantity === 0) {
            res.status(400).send("Stock unavailable");
        } else {
            cartItem.quantity = cartItem.quantity + 1;
            inventory.quantity = inventory.quantity - 1;
        }
    } else {
        cartItem = new Cart({
            quantity: 1,
            productId: inventory._id
        });
        inventory.quantity = inventory.quantity - 1;
    }
    cartItem.save();
    inventory.save();
    return res.status(201).send('Item added to cart');
};

exports.removeItemFromCart = async function(req, res) {
    var query = {productId : req.params.id};
    var cartItem = await Cart.findOne(query);
    var inventory = await Inventory.findById(req.params.id);
    if (inventory === null) {
        res.status(400).send("Invalid product Id");
    }
    if (cartItem === null) {
        res.status(404).send('Item not found in cart');
    }

    inventory.quantity = inventory.quantity + 1;
    inventory.save();
    if (cartItem.quantity === 1) {
        await Cart.deleteOne(query, function(err, cartItem) {
            if (err) {
                console.error(err.message);
                res.status(500).send('Server Error');
            }
            return res.status(200).send('Last item removed from the cart')
        });
    } else {
        cartItem.quantity = cartItem.quantity - 1;
        cartItem.save();
    }
    return res.status(200).send('Item removed from the cart');
};