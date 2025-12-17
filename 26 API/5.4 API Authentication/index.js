import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//DONE 1: Fill in your values for the 3 types of auth.
const yourUsername = "EthanA120";
const yourPassword = "EthanA";
const yourAPIKey = "9d4b3200-dfab-4834-b839-a9d4e6f30543";
const yourBearerToken = "ed138620-39d1-418e-b8f5-9d6d44e80538";

app.get("/", (req, res) => {
    res.render("index.ejs", { content: "API Response.", amount: 'none' });
});

app.get("/noAuth", async (req, res) => {
    //DONE 2: Use axios to hit up the /random endpoint
    //The data you get back should be sent to the ejs file as "content"
    //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
    try {
        const response = await axios.get("https://secrets-api.appbrewery.com/random");
        const content = response.data;
        console.log(content);

        res.render("index.ejs", { content, amount: "one" });

    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", { error: error.message });
    }
});

app.get("/basicAuth", async (req, res) => {
    //DONE 3: Write your code here to hit up the /all endpoint
    //Specify that you only want the secrets from page 2
    //HINT: This is how you can use axios to do basic auth:
    // https://stackoverflow.com/a/74632908
    /*
     axios.get(URL, {
        auth: {
          username: "abc",
          password: "123",
        },
      });
    */
    try {
        const response = await axios.get("https://secrets-api.appbrewery.com/all?page=1", {
            auth: {
                username: yourUsername,
                password: yourPassword
            },
            // params: { username }
        });
        const content = response.data;
        console.log(content);

        res.render("index.ejs", { content, amount: 'multiple' });

    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", { error: error.message });
    }
});

app.get("/apiKey", async (req, res) => {
    //DONE 4: Write your code here to hit up the /filter endpoint
    //Filter for all secrets with an embarassment score of 5 or greater
    //HINT: You need to provide a query parameter of apiKey in the request.
    try {
        const response = await axios.get("https://secrets-api.appbrewery.com/filter", {
            auth: {
                username: yourUsername,
                password: yourPassword
            },
            params: { apiKey: yourAPIKey, score: 5 }
        });
        const content = response.data;
        console.log(content);

        res.render("index.ejs", { content, amount: 'multiple' });

    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", { error: error.message });
    }
});

app.get("/bearerToken", async (req, res) => {
    //DONE 5: Write your code here to hit up the /secrets/{id} endpoint
    //and get the secret with id of 42
    //HINT: This is how you can use axios to do bearer token auth:
    // https://stackoverflow.com/a/52645402
    /*
    axios.get(URL, {
      headers: { 
        Authorization: `Bearer <YOUR TOKEN HERE>` 
      },
    });
    */
    try {
        const response = await axios.get("https://secrets-api.appbrewery.com/secrets/42", {
            headers: {
                Authorization: `Bearer ${yourBearerToken}`
            }
        });
        const content = response.data;
        console.log(content);

        res.render("index.ejs", { content, amount: 'one' });

    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", { error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
