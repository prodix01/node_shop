
const express = require("express");
const app = express();

const productRoutes = require("./routes/api/products");
const ordersRoutes = require("./routes/api/orders");
const usersRoutes = require("./routes/api/users");
//
// app.use((req, res) => {
//    res.json({
//         "msg":"server responsed"
//    })
// });

app.use("/product", productRoutes);
app.use("/orders", ordersRoutes);
app.use("/users", usersRoutes);





const port = 3000;

app.listen(port, console.log("server started"));