import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "world",
    password: "123456",
    port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUser = 1;

let dbUsersRaw = await db.query("SELECT * FROM users ORDER BY id ASC");
let dbUsers = dbUsersRaw.rows;

let users = [
    { id: 1, name: "Angela", color: "teal" },
    { id: 2, name: "Jack", color: "powderblue" },
];

async function getUser(user = 1) {
    const result = await db.query("SELECT ARRAY_AGG(vc.code) AS codes, users.name, users.color FROM visited_countries AS vc RIGHT JOIN users ON users.id = vc.user_id WHERE users.id = $1 GROUP BY users.id;", [user]);
    let userInfo = result.rows[0];
    // console.log(user, userInfo, result);
    if (userInfo) {
        return userInfo;
    } else {
        return userInfo;
    }
}

app.get("/", async (req, res) => {
    const userInfo = await getUser(currentUser);
    res.render("index.ejs", {
        countries: userInfo.codes,
        total: userInfo.codes.length,
        users: dbUsers,
        color: userInfo.color,
    });
});

app.post("/add", async (req, res) => {
    const input = req.body["country"];

    try {
        const result = await db.query(
            "SELECT code FROM countries WHERE LOWER(name) LIKE '%' || $1 || '%';",
            [input.toLowerCase()]
        );

        const data = result.rows[0];
        const countryCode = data.code;
        try {
            await db.query(
                "INSERT INTO visited_countries (code, user_id) VALUES ($1, $2)",
                [countryCode, currentUser]
            );
            res.redirect("/");
        } catch (err) {
            console.log("Can't insert: ", err);
        }
    } catch (err) {
        console.log("Can't get data: ", err);
    }
});

app.post("/user", async (req, res) => {
    currentUser = req.body.user;
    if (req.body.add === "new") {
        return res.redirect("/new");
    } else {
        res.redirect('/');
    };
});

app.get("/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/new", async (req, res) => {
    //Hint: The RETURNING keyword can return the data that was inserted.
    //https://www.postgresql.org/docs/current/dml-returning.html
    const { name, color } = req.body;
    try {
        const newUser = await db.query(
            "INSERT INTO users (name, color) VALUES ($1, $2) RETURNING *",
            [name, color]
        );
        dbUsers.push(newUser.rows[0]);
        res.redirect("/");
    } catch (err) {
        console.log("Can't insert: ", err);
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
