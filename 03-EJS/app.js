const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let items = [];

app.get("/", function (req, res) {
    res.render('index', {items: items});
});

app.post("/", function(req, res){
    items.push(req.body.newItem);
    res.redirect("/")
});

app.listen(5000, function () {
    console.log("Server started at http://127.0.0.1:5000/");
});
