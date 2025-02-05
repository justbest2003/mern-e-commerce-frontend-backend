const express = require("express");
const router = express.Router();
const CartController = require("../controllers/cart.controller");

router.post("/", CartController.createCart);

router.get("/", CartController.getAllCart);

router.get("/:email", CartController.getCart);

router.put("/:id", CartController.updateCartItem);

router.delete("/:id", CartController.deleteCartItemById);

router.delete("/clear/:email", CartController.clearAllItem);

module.exports = router;
