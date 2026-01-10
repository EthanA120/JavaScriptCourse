import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "secrets",
    password: "123456",
    port: 5432,
});

db.connect();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("home.ejs");
});

app.get("/login", (req, res) => {
    res.render("login.ejs");
});

app.get("/register", (req, res) => {
    res.render("register.ejs");
});

app.post("/register", async (req, res) => {
    const email = req.body.username;
    const password = req.body.password;

    const checkEmail = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    if (checkEmail.rows.length > 0) {
        res.send("Email already exists, try another email or login");
    } else {
        await db.query("INSERT INTO users (email, password) VALUES ($1, $2)", [email, password]);
        res.render("secrets.ejs");
    };
});

app.post("/login", async (req, res) => {
    const email = req.body.username;
    const password = req.body.password;

    const checkEmail = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    if (!(checkEmail.rows.length > 0)) {
        res.send("Email incorrect, try again");
    } else if (checkEmail.rows[0].password !== password) {
        res.send("Password incorrect, try again");
    } else {
        res.render("secrets.ejs");
    };
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

