const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true });

const fruitSchema = new mongoose.Schema({
    name: String,
    rating: Number,
    review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
    name: "Apple",
    rating: 7,
    review: "Some review here"
});

const kiwi = new Fruit({
    name: "Kiwi",
    rating: 6,
    review: "Nice fruit, doesn't get along with other fruits"
});

const orange = new Fruit({
    name: "Orange",
    rating: 8,
    review: "Only grows in the winter"
});

const lemon = new Fruit({
    name: "Lemon",
    rating: 10,
    review: "The best fruit!"
});

Fruit.insertMany([kiwi, orange, lemon], function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log("Successfuly saved all the fruits to fruitsDB");
    }
});

34685 "להקים הרשאה, קוד מוסד"

// fruit.save();

// async function run() {
//   try {
//     await client.connect();
//     const db = client.db('fruitsDB');
//     const fruits = db.collection('fruits');

//     const query = {_id: 1, name: 'Apple'};
//     fruits.insertOne(query);

//     const fruit = await fruits.findOne(query);
//     console.log(fruit);
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);