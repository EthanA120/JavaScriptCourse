import express from "express";

const app = express();
const port = 3000;

function logger(req, res, next) {
    console.log(`Request method: ${req.method}`);
    console.log(`Request URL: ${req.url}`);
    next();
}

app.use(logger);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.get("/again", (req, res) => {
  res.send("Hello Again");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}.`);
});