import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "world",
    password: "123456",
    port: 5432,
});

const app = express();
const port = 3000;

let error = '';
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
    //Write your code here.
    // Get the visited countries from the db as array with key named codes
    let countries = await db.query("SELECT ARRAY_AGG(code) AS codes FROM visited_countries");
    countries = countries.rows[0].codes;
    // Check the total countries visited
    let total = countries.length;
    console.log(countries, total);
    res.render('index.ejs', { countries, total: total, error: error });
});

app.post("/add", async (req, res) => {
    // Get country name from form
    const country = req.body.country;
    // Get the country code that match the country name from the db
    const getCountryCode = await db.query("SELECT code FROM countries WHERE LOWER(name) LIKE '%' || $1 || '%'", [country.toLowerCase()]);
    // Country code will be defined only if there is such country
    const countryCode = getCountryCode.rows.length !== 0 ? getCountryCode.rows[0].code : console.log("There is no such country as ", country);;
    console.log("body.country: ", country, "Country code:", countryCode);

    // Break if there is no such country
    if (!countryCode || !country) {
        error = `There is no country named ${country}`
        return res.redirect('/');
    } else {
        // If there is no error, add the new country to the visited countries array and to db
        db.query(`INSERT INTO visited_countries (code) VALUES ('${countryCode}')`, (err, res) => {
            if (err) {
                error = err.code === "23505" ? `${country} already in your collection!` : err.message;
                console.error("Error executing query:", err.message);
            } else {
                console.log(`${countryCode} Added Successfully`);
            };
        });
    }
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});