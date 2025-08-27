/* For this part we should use the commonjs type in the package.json file */ 
var generateName = require('sillyname');
var sillyName = generateName();

console.log(`My name is ${sillyName}.`);


/* For this part we should use the module type in the package.json file */ 
import {randomSuperhero} from 'superheroes';

console.log(`I'm ${randomSuperhero()}!`);

