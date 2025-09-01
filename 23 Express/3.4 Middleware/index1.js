import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true})); // Crucial for configuring how the URL-encoded data is parsed

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html"); // current work directory location
});

app.post("/submit", (req, res) => {
  res.send(`<p>${Object.values(req.body) /* req.body.street + " " + req.body.pet */}</p>`);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}.`);
});
