import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url)); // Vurrent work directory location
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true })); // Crucial for configuring how the URL-encoded data is parsed
app.use(morgan("tiny")); // Give some info about http interactions

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html"); // Current directory location
});

app.post("/submit", (req, res) => {
    res.send(`<h2>Your band name is:</h2><p>${req.body.street + req.body.pet} 🤟</p>`); // Combine both names to Band name
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}.`);
});
