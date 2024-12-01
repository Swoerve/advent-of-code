import * as fs from 'node:fs';
import minimist from 'minimist';
import * as dot from 'dotenv'

dot.config()

// import directory since es modules dont have __dirname natively
const __dirname = import.meta.dirname

const USER_AGENT_HEADER = {
  "User-Agent": "github.com/swoerve/advent-of-code by swoerve@gmail.com",
}

// parse args in a object format thanks to minimist
let argv = minimist(process.argv.slice(2), {
  boolean: ['help'],
  alias: {
    y: 'year',
    d: 'day',
    p: 'part',
    h: 'help',
    g: 'get'
  }
})

console.log(argv)

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
if(argv.get && argv.day){
  await getDayInput()
}else if(argv.day && argv.part){
  //console.log("all entered")
  const result = days[argv.day][`part${argv.part}`]()
  console.log(`${year}/${argv.day} (part ${argv.part}) result: ${result}`)
} else if (argv.help) { // if we have -h
  console.log("| Usage: node main.js -y [year] -d [day] -p [1/2]")
} else { // if we have no args send generic -h message
  console.log("use -h")
}

async function getDayInput(){
  if (fs.existsSync(`./${year}/${dirs[argv.day-1]}/input.txt`) && fs.statSync(`./${year}/${dirs[argv.day]}/input.txt`).size > 0) {
    console.log(`INPUT FOR AOC ${year} DAY ${argv.day} ALREADY FETCHED`)
    return
  }
  await fetch(`https://adventofcode.com/${year}/day/${argv.day}/input`, {
    headers: {
      cookie: `session=${process.env.SESSION}`,
      ...USER_AGENT_HEADER,
    },
  }).then(res => {
    console.log("RESPONSE")
    console.log(res)
    if (res.status !== 200) {
      throw new Error(String(res.status))
    }

    return res.text()
  }).then(result =>{
    console.log("RESULT")
    console.log(result)
    try {
      fs.writeFileSync(`./${year}/${dirs[argv.day-1]}/input.txt`, result);
      // file written successfully
      console.log(`INPUT FOR AOC ${year} DAY ${argv.day} SUCCESFULLY WRITTEN`)
    } catch (err) {
      console.error(err);
    }
    return result
  })
}