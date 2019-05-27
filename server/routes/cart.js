const express = require('express');
const router = express.Router();

const cartController = require("../controller/cartController");

//  @route      GET api/cart
//  @desc       GET all items of cart
//  @access     Private
router.get("/", cartController.getCart);

//  @route      GET api/cart/count
//  @desc       GET count of all items of cart
//  @access     Private
router.get("/count", cartController.getCartCount);

//  @route      POST api/cart/product/:id
//  @desc       POST add product by id
//  @access     Private
router.post("/product/:id", cartController.addItemToCart);

//  @route      DELETE api/cart/product/:id
//  @desc       DELETE item by product from cart
//  @access     Private
router.delete("/product/:id", cartController.removeItemFromCart);

//  @route      DELETE api/cart/
//  @desc       DELETE all items from cart
//  @access     Private
router.delete("/", cartController.clearCart);

module.exports = router;