import { readFileSync } from 'node:fs';

function read(){
  const __dirname = import.meta.dirname
  let text = readFileSync(`${__dirname}/input4.txt`, 'utf8');
  text = text.trim()
  let splitText = text.split("\n")
  return splitText
}

// unsafe if diff = 0 or diff > 3
// safe if 0 < diff < 4
// how many reports are safe?
export function part1(){
  let data = read()
  let splitData = []
  data.forEach((line) => {
    splitData.push(line.split(" "))
  })
  let safeReports = 0

  splitData.forEach(report => {
    safeReports += (isSafe(report) ? 1 : 0)

  })

  return JSON.stringify(safeReports)
}

export function part2(){
  let data = read()
  let splitData = []
  data.forEach((line) => {
    splitData.push(line.split(" "))
  })
  let safeReports = 0

  splitData.forEach(report => {
    if (isSafe(report) || isSafeWithDampener(report)){
      safeReports += 1
    }

  })

  return JSON.stringify(safeReports)
}

function isSafe(report){

  let sign

  for(let i = 1; i < report.length; i++){
    let diff = report[i] - report[i - 1]
    //console.log(report[i])
    //console.log(report[i-1])
    

    let currSign = Math.sign(diff)
    let absDiff = Math.abs(diff)

    if (![1, -1].includes(currSign)) {

      return false;
    }

    if (!sign) sign = currSign;

    if (sign !== currSign) {

      return false;
    }

    if(!(0 < absDiff && absDiff < 4)){
      return false
    }

  }

  return true
}

function isSafeWithDampener(report){

  // console.log("report")
  let safe
  for(let i = 0; i < report.length; i++){
    
    safe = isSafe(report.toSpliced(i, 1) || isSafe(report.toSpliced(i - 1, 1)))
    if(safe){return true}
  }
  return false
}