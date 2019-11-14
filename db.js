const mongoose = require("mongoose");

//const dbaddress = "mongodb+srv://user1:aa1234@cluster0-nbev1.mongodb.net/test?retryWrites=true&w=majority";


const dbaddress = "mongodb://teddykwak:k9915402@ds141294.mlab.com:41294/node-rest-shop";

mongoose.connect(dbaddress, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("몽고DB connect..."))
    .catch(err => console.log(err.message));