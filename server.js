
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const productRoutes = require("./routes/api/products");
const ordersRoutes = require("./routes/api/orders");
const usersRoutes = require("./routes/api/users");


//const dbaddress = "mongodb+srv://user1:aa1234@cluster0-nbev1.mongodb.net/test?retryWrites=true&w=majority";
const dbaddress = "mongodb://teddykwak:k9915402@ds141294.mlab.com:41294/node-rest-shop";
mongoose.connect(dbaddress, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("몽고DB connect..."))
    .catch(err => console.log(err.message));



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));



app.use("/product", productRoutes);
app.use("/orders", ordersRoutes);
app.use("/users", usersRoutes);





const port = 3000;

app.listen(port, console.log("server started"));