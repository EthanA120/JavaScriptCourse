import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "permalist",
    password: "123456",
    port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let lastID = 3;
// let items = [
//   { id: 1, title: "Buy milk" },
//   { id: 2, title: "Finish homework" },
// ];

let dbItems = await db.query("SELECT * FROM items ORDER BY id ASC");
let items = dbItems.rows;
// console.log(items);


app.get("/", (req, res) => {
    res.render("index.ejs", {
        listTitle: "Today",
        listItems: items,
    });
});


app.post("/add", async (req, res) => {
    const item = req.body.newItem;
      try {
        await db.query("INSERT INTO items (title) VALUES ($1)", [item]);
      } catch (error) {
        console.log(error.message);
        return res.redirect("/");
      }

    items.push({ id: lastID, title: item });
    lastID += 1;
    res.redirect("/");
});


app.post("/edit", async (req, res) => {
    const { updatedItemId, updatedItemTitle } = req.body;
    // console.log(updatedItemId, updatedItemTitle);

    try {
        await db.query("UPDATE items SET title = $2 WHERE id = $1;", [updatedItemId, updatedItemTitle]);
    } catch (error) {
        console.log(error.message);
        return res.redirect("/");
    }

    const item = items.find(i => i.id === Number(updatedItemId));
    if (item) {
        item.title = updatedItemTitle;
    }
    res.redirect("/");
});


app.post("/delete", async (req, res) => {
    const deleteItemId = req.body.deleteItemId;
    // console.log(updatedItemId, updatedItemTitle);

    try {
        await db.query("DELETE FROM items VALUES WHERE id = $1", [deleteItemId]);
    } catch (error) {
        console.log(error.message);
        return res.redirect("/");
    }

    items = items.filter(item => item.id !== Number(deleteItemId));
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
