var buttonColours = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userClickedPattern = [];
var gameState = false;
var level = 0;

// Starting the game:
$("body").keydown(function () { // Clicking on the page will:
    if (!gameState) {
        gameState = true; // Change the game to be started
        nextSequence(); // Run a new sequence
    }
});

// Clicking on a button:
$(".btn").on("click", function (e) { // By clicking one of the buttons:
    var userChosenColour = e.target.id // Get the chosen color id / name
    buttonAnimation(userChosenColour, "pressed",); // Play button animation
    userClickedPattern.push(userChosenColour); // Adds the new color to the user pattern array
    console.log("userChosenColour, gamePattern, userClickedPattern:",
        userChosenColour, gamePattern, userClickedPattern);
    checkAnswer(userClickedPattern, gamePattern); // Check if the click is correct
});


// Next sequence of the game after clicking a button:
function nextSequence() {
    level++; // Change level number to the next level
    $("#level-title").text(`Level ${level}`); // Change title to level number
    userClickedPattern = []; // Restart the user clicked pattern
    var randomNumber = Math.floor(Math.random() * buttonColours.length); // Create random number maching the length of the colors array
    var randomChosenColour = buttonColours[randomNumber]; // Stores the color in an array
    gamePattern.push(randomChosenColour); // Adds the new color to the games pattern array
    console.log(gamePattern);
    buttonAnimation(gamePattern.at(-1), "next", 700); // Animates the new button
}


// Checking if the buttons that has been clicked was right:
function checkAnswer(userClickedPattern, gamePattern) {
    var current = userClickedPattern.length - 1;
    if (userClickedPattern.at(-1) === gamePattern[current]) {
        console.log("Right!");
        if (userClickedPattern.length === gamePattern.length && gameState) { // At the end of the user sequense:
            setTimeout(() => {nextSequence()}, 1000); // Run a new sequence
        }

    } else { // Resets all values
        console.log("Wrong!");
        makeSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 300);
        gamePattern.length = 0;
        userClickedPattern.length = 0;
        gameState = false;
        level = 0;
        $("#level-title").text("Game Over!\n Press any key to restart"); // Change title to level number
    };
}


function buttonAnimation(color, className, timer = 100) {
    $(`#${color}`).addClass(className); // Add css to pressed button
    makeSound(color); // Make button sound
    setTimeout(() => {
        $(`#${color}`).removeClass(className); // after 0.1s removes press effect
    },
        timer);
}


function makeSound(color) {
    var audio = new Audio("./sounds/" + color + ".mp3");
    audio.play();
}