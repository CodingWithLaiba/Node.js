import { add, sub } from "./modules/math.js";
import { name } from "./modules/name.js";

// const math = require("./modules/math.js");

console.log(name()); //export from name.js
console.log(add(1, 3)); //export from math.js
console.log(sub(10, 2));

console.log("Hello world");
console.log("Hello JS");
