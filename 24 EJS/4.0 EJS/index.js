import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url)); // Vurrent work directory location
const app = express();
const port = 3000;

var sentence;

function sentenceCheck(req, res, next) {
    var today = new Date();
    var dayOfWeek = today.getDay();

    sentence = dayOfWeek <= 4 ?
    "weekday, Let's enjoy work!" :
    "weekend, It's time to enjoy life!";
    
    console.log(dayOfWeek, sentence);
    next();
}

app.use(express.urlencoded({ extended: true })); // Crucial for configuring how the URL-encoded data is parsed
app.use(sentenceCheck);

app.get("/", (req, res) => {
    res.render(__dirname + "/views/index.ejs",
        {sentence: sentence}); // Render the ejs file send to it the var "sentence"
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}.`);
});
