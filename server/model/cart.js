const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'inventory'
    },
    quantity: {
        type: Number,
        required: true
    }
});
module.exports = Cart = mongoose.model('cart', CartSchema);