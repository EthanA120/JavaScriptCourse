//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming

import express from "express";
// import bodyParser from "body-parser"; // Now it's part of Express so there is no need in it
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url)); // Vurrent work directory location
const app = express();
const port = 3000;
var correctPass;

function isTrue(req, res, next){
    correctPass = req.body.password === "Ethan" ? true : false;
    console.log(req.body.password, correctPass);
    next();
}

app.use(express.urlencoded({ extended: true })); // Crucial for configuring how the URL-encoded data is parsed
app.use(isTrue);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html"); // Current directory location
});

app.post("/check", (req, res) => {
    if (correctPass) {
        res.sendFile(__dirname + "/public/secret.html");
    }
    else {
        res.redirect("/")
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}.`);
});
