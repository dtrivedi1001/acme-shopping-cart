const express = require('express');
const router = express.Router();

const inventoryController = require("../controller/inventoryController")

//  @route      GET api/inventory
//  @desc       Add new product
//  @access     Private
router.get("/", inventoryController.getInventory);

//  @route      GET api/inventory/:id
//  @desc       Get product by id
//  @access     Private
router.get("/:id", inventoryController.getInventoryById);

module.exports = router;