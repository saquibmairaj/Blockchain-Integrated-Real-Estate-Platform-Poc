const express = require('express');
const { newOrder, getSingleOrderDetails, myOrders, getAllOrders, updateOrder, deleteOrder } = require('../controllers/orderController');

const router = express.Router();

module.exports = router;