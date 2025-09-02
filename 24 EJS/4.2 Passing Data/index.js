import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
var sentence;

app.use(bodyParser.urlencoded({ extended: true }));

function checkSent(req, res, next) {
    var values = Object.values(req.body);
    var valuesLength = values.join("").length;
    console.log(values);
    sentence = valuesLength !== 0 ?
        `There are ${valuesLength} letters in your name.` :
        "Enter your name below 👇";
    next();
};

app.use(checkSent);

app.get("/", (req, res) => {
    res.render("index.ejs", { sentence: sentence });
});

app.post("/submit", (req, res) => {
    res.render("index.ejs", { sentence: sentence });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}.`);
});
