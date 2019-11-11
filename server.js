
const express = require("express");
const app = express();


app.use((req, res) => {
   res.json({
        "msg":"server responsed"
   })
});




const port = 3000;

app.listen(port, console.log("server started"));