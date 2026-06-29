import fs from "fs";
// or can also write
// const fs = require("fs")

//for creating files

// fs.writeFileSync("./test.txt", "Hello World")
// fs.writeFile("./test.txt", "Hello Node",(err)=>{})

// for reading file
const result = fs.readFileSync("./contact.txt", "utf-8");
console.log(result);

//    fs.appendFileSync("./test.txt"," Today Date is: " + new Date().getDate().toLocaleString())
fs.appendFileSync("./test.txt", `${Date.now()} Hey `);

fs.cpSync("./test.txt", "./copy.txt");
fs.unlinkSync("./copy.txt");
console.log(fs.statSync("./test.txt"));
