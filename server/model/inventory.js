const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
    }

});
module.exports = Inventory = mongoose.model('inventory', InventorySchema);