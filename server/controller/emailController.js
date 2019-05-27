const express = require('express');
const router = express.Router();
const sendmail = require('sendmail')();


exports.sendEmail = async function(req, res) {
    var email = req.body.email;
    var carts = req.body.cart;

    let html = "";
    html += "Total price billed is <strong>$" + totalBill(carts) + "</strong>";
    console.log(html);

    sendmail({
        from: 'info@acme-shopping.com',
        to: email,
        subject: 'Receipt confirmation from ACME Shopping cart',
        html: html,
    }, function(err, reply) {
        console.log(err && err.stack);
    });
    res.status(200).send('Email sent')
};

totalBill = (carts) => {
    let bill = 0.00;
    for (var key in carts)
    {
        let cart = carts[key];
        let itemPrice = (cart.quantity * cart.productId.price).toFixed(2);
        bill = (Number(bill) + Number(itemPrice));
    }
    return bill.toFixed(2);
};


