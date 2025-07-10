
function HouseKeeper (name, yearsOfExperience, cleaningRepertoire) { /* Constructor function will be written with a capital letter */
    this.name = name;
    this.yearsOfExperience = yearsOfExperience;
    this.cleaningRepertoire = cleaningRepertoire;

    this.clean = function(){ /* A method */
        alert("Cleaning in progress");
    }
}

var houseKeeper1 = new HouseKeeper("Emma", 19, true);
var houseKeeper2 = new HouseKeeper("Jemma", 21, false);

console.log(houseKeeper1.name);
console.log(houseKeeper2.cleaningRepertoire);
houseKeeper1.clean(); /* A call for method will end with Parentheses */