const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();


const productRoutes = require("./routes/api/products");
const ordersRoutes = require("./routes/api/orders");
const usersRoutes = require("./routes/api/users");

require("./db");

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use("/product", productRoutes);
app.use("/orders", ordersRoutes);
app.use("/users", usersRoutes);

module.exports = app;
