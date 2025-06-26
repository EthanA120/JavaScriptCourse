
/*
    Write a function that outputs (returns) a different message depending on the BMI.
    The message MUST be returned as an output from your function. You should NOT NEED to use alert, prompt or console.log in this challenge.
    
    IMPORTANT the message wording has to match precisely for the code to pass the validation. Including punctuation and capitalisation.

    BMI <18.5, the output should be: "Your BMI is <bmi>, so you are underweight."

    BMI 18.5-24.9, the output should be "Your BMI is <bmi>, so you have a normal weight."

    BMI >24.9, the output should be "Your BMI is <bmi>, so you are overweight."

*/

function bmiCalculator(weight, height) {
    var bmi = (weight / (height * height)).toFixed(1);
    roundedBMI = Math.round(bmi)
    var interpretation;

    if (bmi < 18.5) {
        interpretation = "Your BMI is " + roundedBMI + ", so you are underweight.";
    }

    if (18.5 < bmi && bmi < 24.9) {
        interpretation = "Your BMI is " + roundedBMI + ", so you have a normal weight.";
    }

    if (24.9 < bmi) {
        interpretation = "Your BMI is " + roundedBMI + ", so you are overweight.";
    }

    console.log(interpretation);
    return interpretation;
}

bmiCalculator(60, 1.75);