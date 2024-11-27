import * as fs from 'node:fs';
import minimist from 'minimist';

// import directory since es modules dont have __dirname natively
const __dirname = import.meta.dirname

// parse args in a object format thanks to minimist
let argv = minimist(process.argv.slice(2))

//console.log(argv)

//  if no year arg, then get current year
let year = argv.y || new Date().getFullYear()

// get all day directories depending on year
let dirs = fs.readdirSync(`${__dirname}/${year}`)
//console.log(dirs)

// loop through all days dirs and import their functions
const days = {}
for(const day of dirs){
  days[day] = await import(`./${year}/${day}/index.js`)
}


//console.log(days)

// if we have -d and -p
if(argv.d && argv.p){
  //console.log("all entered")
  const result = days[argv.d][`part${argv.p}`]()
  console.log(`${year}/${argv.d} (part ${argv.p}) result: ${result}`)
} else if (argv.h) { // if we have -h
  console.log("| Usage: node main.js -y [year] -d [day] -p [1/2]")
} else { // if we have no args send generic -h message
  console.log("use -h")
}
