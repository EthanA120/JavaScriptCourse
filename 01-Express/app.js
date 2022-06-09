const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
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

    res.sendFile(__dirname + "/index.html");
});


app.post("/about", function (req, res) {
    res.sendFile(__dirname + "/index.html");
    let num1 = req.body.num1;
    let num2 = req.body.num2;
    res.send(`
    <h1>Your numbers: ${num1} and ${num2}</h1>
    <h1>The sum is: ${parseInt(num1) + parseInt(num2)}</h1>
    <a href="/" class="btn btn-primary m-1"><h2>Back to the calculator</h2></a>
    `);
});

app.listen(5000, function () {
    console.log("Server started on port 5000");
});
