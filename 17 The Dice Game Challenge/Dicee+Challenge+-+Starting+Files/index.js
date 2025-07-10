var randomNumber1 = Math.ceil(Math.random()*6).toString();
var randomNumber2 = Math.ceil(Math.random()*6).toString();

var gameTitle = document.querySelector("h1");

var image1 = document.querySelector(".img1").setAttribute("src", `./images/dice${randomNumber1}.png`);
var image2 = document.querySelector(".img2").setAttribute("src", `./images/dice${randomNumber2}.png`);

if (randomNumber1 > randomNumber2) {
    gameTitle.innerHTML = "🚩 Player 1 Wins!"
}
else if (randomNumber1 < randomNumber2) {
    gameTitle.innerHTML = "Player 2 Wins! 🚩"
}
else (gameTitle.innerHTML = "Draw!");
