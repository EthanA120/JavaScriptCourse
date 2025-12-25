import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;
const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false // Ensure 24-hour format (e.g., 23:00 instead of 11 PM)
};

// In-memory data store
let posts = [
    {
        id: 1,
        title: "The Rise of Decentralized Finance",
        content:
            "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.",
        author: "Alex Thompson",
        date: "2023-08-01T10:00:00Z",
    },
    {
        id: 2,
        title: "The Impact of Artificial Intelligence on Modern Businesses",
        content:
            "Artificial Intelligence (AI) is no longer a concept of the future. It's very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.",
        author: "Mia Williams",
        date: "2023-08-05T14:30:00Z",
    },
    {
        id: 3,
        title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
        content:
            "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
        author: "Samuel Green",
        date: "2023-08-10T09:15:00Z",
    },
];

let lastId = 3;

// Middleware
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Write your code here//
app.get("/", (req, res) => {
    res.render('index.ejs', { posts });
});


// DONE CHALLENGE 1: GET All posts
app.get("/posts", (req, res) => {
    console.log(posts);
    res.json(posts);
});

// DONE CHALLENGE 2: GET a specific post by id
app.get("/posts/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const postById = posts.find((post) => post.id === id);

    res.json(postById);
});

// DONE CHALLENGE 3: POST a new post
app.post("/posts", (req, res) => {
    const postTitle = req.body.title;
    const postContent = req.body.content;
    const postAuthor = req.body.author;

    if (!postTitle || !postContent || !postAuthor) {
        return res.status(400).json({
            error: "Bad Request",
            message: "Missing required parameters: All form inputs are required."
        });
    } else {
        lastId += 1;
        const newPost = {
            id: lastId,
            title: postTitle,
            content: postContent,
            author: postAuthor,
            date: new Date(),
            // date: new Date().toLocaleString('he-IL', options),
        };
        console.log(newPost);
        posts.push(newPost);
        console.log(posts.slice(-2));
        res.json(newPost);
    }
});

// DONE CHALLENGE 4: PATCH a post when you just want to update one parameter
app.patch("/posts/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const postById = posts.find((post) => post.id === id);

    postById.title = req.body.title || postById.title;
    postById.content = req.body.content || postById.content;
    postById.author = req.body.author || postById.author;
    postById.date = new Date().toLocaleString('he-IL', options);

    console.log(posts.slice(id - 2, id));
    res.json(postById);
});

// DONE CHALLENGE 5: DELETE a specific post by providing the post id.
app.delete("/posts/:id", (req, res) => {
    const id = parseInt(req.params.id);

    if (posts.find((post) => post.id === id)) {
        posts = posts.filter((post) => post.id !== id);
        console.log(posts.slice(id - 2, id));
        res.json("post has been deleted Successfully!");
    } else {
        return res.status(404).json({
            error: "Not Found",
            message: "The requested post is missing or has been deleted."
        });
    }
});

app.listen(port, () => {
    console.log(`API is running at http://localhost:${port}`);
});
