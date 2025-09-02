import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
var sentence;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index2.ejs");
});

app.post("/submit", (req, res) => {
    var valuesLength = Object.values(req.body).join("").length; // Take the values returned from the form as an array, joins them as a string and count the length of it
    res.render("index2.ejs", { valuesLength: valuesLength });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}.`);
});
