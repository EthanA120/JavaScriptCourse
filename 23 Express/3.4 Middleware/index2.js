import express from "express";
import morgan from "morgan";

const app = express();
const port = 3000;
app.use(morgan("tiny")); // Give some info about http interactions

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}.`);
});
