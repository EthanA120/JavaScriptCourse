import express from "express";

const app = express();
const port = 3000;

app.use(express.static("public"));
// app.use(express.json()); // Enable JSON body parsing
app.use(express.urlencoded({ extended: true })); // Enable URL-encoded body parsing



app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/posts", (req, res) => {
    res.render("posts.ejs");
});

app.post("/newPost", (req, res) => {
    // console.log(req.body); // Access the parsed JSON data
    res.render("newPost.ejs");
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}.`);
});
