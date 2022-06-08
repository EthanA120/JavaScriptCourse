const express = require("express");
const bodyParser = require("body-parser")

const app = express();
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/about", function(req, res){
    res.sendFile(__dirname + "/index.html");
    let num1 = req.body.num1;
    let num2 = req.body.num2;
    res.send(`
    <h1>Your numbers: ${num1} and ${num2}</h1>
    <h1>The sum is: ${parseInt(num1) + parseInt(num2)}</h1>
    <a href="/" class="btn btn-primary m-1"><h2>Back to the calculator</h2></a>
    `);
});

app.listen(5000, function(){
    console.log("Server started on port 5000");
});
