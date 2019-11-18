const mongoose = require("mongoose");

//const dbaddress = "mongodb+srv://user1:aa1234@cluster0-nbev1.mongodb.net/test?retryWrites=true&w=majority";




mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("몽고DB connect..."))
    .catch(err => console.log(err.message));