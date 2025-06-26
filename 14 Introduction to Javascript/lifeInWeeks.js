function lifeInWeeks(age) {
    /************Don't change the code above************/
    //Write your code here.
    var daysInYear = 365;
    var weeksInYear = 52;
    var monthsInYear = 12;
    var timeLeft = 90 - age;

    console.log("You have " + timeLeft * daysInYear + " days, " + timeLeft * weeksInYear + " weeks, and " + timeLeft * monthsInYear + " months left.");
    /*************Don't change the code below**********/
}

lifeInWeeks(32);