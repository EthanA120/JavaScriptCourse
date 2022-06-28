const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true });

const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please name the fruit"]
    },
    rating:{
        type: Number,
        min: 0,
        max: 10
    },
    review: String
});

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please name the person"]
    },
    age:{type: Number},
    favoriteFruit: fruitSchema
});

const Fruit = mongoose.model("Fruit", fruitSchema);
const Person = mongoose.model("Person", personSchema);

const fruit = new Fruit({
    name: "Apple",
    rating: 7,
    review: "Some review here"
});

// fruit.save();

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

const person = new Person({
    name: "Ethan",
    age: 28,
    favoriteFruit: lemon
});

// person.save();


Fruit.find({}, function(err, fruitsList){
    fruitsList.forEach(fruit => {
        console.log(fruit.name);
    });
});

Person.find({}, function(err, people){
    console.log(people[0].favoriteFruit.name);
});