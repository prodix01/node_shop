
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("./db");


const productRoutes = require("./routes/api/products");
const ordersRoutes = require("./routes/api/orders");
const usersRoutes = require("./routes/api/users");






app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));



app.use("/product", productRoutes);
app.use("/orders", ordersRoutes);
app.use("/users", usersRoutes);





const port = 3000;

app.listen(port, console.log(`server started at http://localhost:${port}`));