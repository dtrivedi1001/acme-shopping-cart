const inventory = require('../model/inventory');

exports.getInventory = async function(req, res) {
    inventory.find({}, function(err, inventories) {
        if (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
        var inventoryMap = {};
        inventories.forEach(function(inventory) {
            inventoryMap[inventory._id] = inventory;
        });
        res.send(inventoryMap);  
    });
};

exports.getInventoryById = async function(req, res) {
    try {
        const product = await inventory.findById(req.params.id);
        if(!product){
            return res.status(404).json({msg: 'Product not found'});
        }
        res.json(product);
    } catch (err) {
        console.error(err.message);
        if(!err.kind === 'ObjectId'){
            return res.status(404).json({msg: 'Product not found'});
        }
        res.status(500).send('Server Error');
    }
};