const express = require("express");
const bodyParser = require("body-parser");
const { response } = require("express");
const https = require("https");

const app = express();
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res){
    const url = "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json";
    https.get(url, function (res) {
        let data = "";

        res.on("data", (chunk) => {
            data += chunk;
        });

        res.on("end", () => {
            try {
                let superheros = JSON.parse(data);
                console.log(`Superhero's name: ${superheros[495].name}`)  // Superman
            } catch (error) {
                console.error(error.message);
            };
        });

    }).on("error", (error) => {
        console.error(error.message);
    });

    res.sendFile(`${__dirname}/signup.html`)
});

app.post("/", function(req, res){
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    
    console.log(username, email, password);
    
    if(response.statusCode === 200){
        res.sendFile(`${__dirname}/success.html`);
    } else {
        res.sendFile(`${__dirname}/failure.html`);
    }
});

app.post("/failure", function(req, res){
    res.redirect("/");
});

app.listen(5000, function () {
    console.log("Server started at http://127.0.0.1:5000/");
});
