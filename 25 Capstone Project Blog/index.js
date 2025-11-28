import express from "express";
import { readFile, writeFile } from 'fs/promises';
import bodyParser from "body-parser";

const app = express();
const port = 3000;
var pickSubject;
var subjectID = 4;

const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false // Ensure 24-hour format (e.g., 23:00 instead of 11 PM)
  };

var data = {
    1: {
        id: 1,
        name: 'Santo DeArpegio',
        subject: 'Some stuff to read',
        date: new Date("September 26, 2024 10:30").toLocaleString('he-IL', options),
        description: 'About some stuff that you may or may not like',
        text: "This is what's in my mind now"
    },
    2: {
        id: 2,
        name: 'Don Vitaly',
        subject: 'Systemic rules and stuff',
        date: new Date("October 01, 2024 05:05").toLocaleString('he-IL', options),
        description: 'About System rules and some other stuff',
        text: "Rule number 1: Do not tell us what to do"
    },
    3: {
        id: 3,
        name: 'Katy Perrot',
        subject: 'Other stuff and stuff',
        date: new Date("January 15, 2025 11:47").toLocaleString('he-IL', options),
        description: 'About some other stuff too',
        text: "It's not something that I can tell you"
    }
};

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


function dataBase(req, res, next) {
    var values = req.body;
    // If there are values to get
    if (Object.keys(values).length > 0) { 
        // Values get into data under the name of the id as key
        data[subjectID] = values;
        data[subjectID].id = subjectID;
        data[subjectID].date = new Date().toLocaleString('he-IL', options);
        // Increase ID
        subjectID++; 
    }
    console.log("data is:", data);

    next();
};

// Check if the url name from / and onward is in data keys
function checkUrl(req, res, next) {
    // The url with the / char
    res.locals.url = req.originalUrl; 
    // If the url string after the / in date keys
    if (Object.hasOwn(data, res.locals.url.slice(1))) {
        // pick this ID
        pickSubject = res.locals.url.slice(1);
        console.log("ID is:", pickSubject);
        next(); 
    } else {
        // If the key does not exist, return 404
        res.status(404).send("Subject ID not found.");
    }
};


app.use(dataBase);

app.get("/", (req, res) => {
    console.log();
    res.render("index.ejs", { data, url: req.originalUrl });
});

app.get('/posts', (req, res) => {
    console.log(pickSubject);
    res.render("posts.ejs", { data });
});

app.get('/:pickSubject(\\d+)', checkUrl, (req, res) => {
    console.log(data[pickSubject]);
    res.render("index.ejs", { data, subject: data[pickSubject] });
});

app.get("/newPost", (req, res) => {

    res.render("newPost.ejs");
});

app.post("/submit", (req, res) => {

    res.redirect("/");
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}.`);
});