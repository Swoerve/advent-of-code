import * as fs from 'node:fs';
import minimist from 'minimist';

const __dirname = import.meta.dirname

let argv = minimist(process.argv.slice(2))

console.log(argv)

let year = argv.y || new Date().getFullYear()

let dirs = fs.readdirSync(`${__dirname}/${year}`)
//console.log(dirs)

const days = {}
for(const day of dirs){
  days[day] = await import(`./${year}/${day}/index.js`)
}
//console.log(days)
if(argv.d && argv.p){
  //console.log("all entered")
  const result = days[argv.d][`part${argv.p}`]()
  console.log(`${year}/${argv.d} (part ${argv.p}) result: ${result}`)
} else if (argv.h) {
  console.log("| Usage: node main.js -y [year] -d [day] -p [1/2]")
} else {
  console.log("use -h")
}
