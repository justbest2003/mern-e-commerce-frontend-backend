const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const { upload, uploadToFirebase } = require("../middlewares/file.middleware");
const authJwt = require("../middlewares/authJwt.middleware");

//http://localhost:5000/api/v1/post
router.post("/", upload, uploadToFirebase, productController.createProduct);

//http://localhost:5000/api/v1/post
router.get("/", productController.getProducts);

//http://localhost:5000/api/v1/post/id
router.get("/:id", productController.getById);

//http://localhost:5000/api/v1/post/author/id
router.get("/author/:id", productController.getPostByAuthor);

router.delete("/:id", productController.deleteProduct);

router.put("/:id", upload, uploadToFirebase, productController.updateProduct);

module.exports = router;
