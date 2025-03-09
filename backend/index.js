const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
const BASE_URL = process.env.BASE_URL;
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;
const userRouter = require("./routers/user.router");
const productRouter = require("./routers/product.router");
const cartRouter = require("./routers/cart.router");
const stripeRouter = require("./routers/stripe.router");
const orderRouter = require("./routers/order.router");

try {
  mongoose.connect(DB_URL);
  console.log("Connect to mongo DB Successfully");
} catch (error) {
  console.log("DB Connection Failed");
}

app.use(cors({ origin: BASE_URL, credentials: true }));
//stripe webhook must use raw body
app.use("/api/v1/stripe/webhook", express.raw({ type: "application/json" }));
app.use(express.json());
app.get("/", (req, res) => {
  res.send("<h1>Welcome to E-commerce Restful API</h1>");
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/stripe", stripeRouter);
app.use("/api/v1/order", orderRouter);

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
