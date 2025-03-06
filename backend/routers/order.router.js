const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/order.controller");

router.get("/", OrderController.getAllOrders);

router.get("/:id", OrderController.getOrderById);

router.put("/:id", OrderController.updateDeliveryStatus);

module.exports = router;
