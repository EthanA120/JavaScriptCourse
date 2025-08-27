import inquirer from 'inquirer';
import * as qr from 'qr-image';
import * as fs from 'fs';

// 1. Use the inquirer npm package to get user input.
const questions = [
  {
    type: 'input',
    name: 'url',
    message: "Enter URL",
    default() {
      return 'https://www.google.com/';
    },
  },
];

inquirer.prompt(questions).then((answers) => {
  var userURL = answers.url; /* get the url as string */


// 2. Use the qr-image npm package to turn the user entered URL into a QR code image.
var qr_png = qr.image(userURL, { type: 'png' });
qr_png.pipe(fs.createWriteStream('qrURL.png'));


// 3. Create a txt file to save the user input using the native fs node module.
fs.writeFile("URL.txt", userURL, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
});
});


