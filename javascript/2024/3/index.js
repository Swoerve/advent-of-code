import { readFileSync } from 'node:fs';

function read(){
  const __dirname = import.meta.dirname
  let text = readFileSync(`${__dirname}/input.txt`, 'utf8');
  text = text.trim()
  let splitText = text.split("\n")
  return splitText
}

export function part1(){
  let text = read()
  text = text.join("") // text is originally an array, so join the lines into 1 large string

  // a reges that matches for mul(123,123)
  // it also groups the leftside number and rightside number for ease of acces
  const regex = /(?<mul>mul[(](?<num1>\d+),(?<num2>\d+)[)])/gm;

  let sum = 0 // THE SUM :O

  let filtered = text.matchAll(regex) // get the matches

  // loop through each match instance
  for(const match of filtered){
    // if we found a mul match ( i guess not necessary since all matches should be mul matches)
    if(match.groups.mul){
      // multiply num1 with num2 and add it to sum
      sum += (+match.groups.num1) * (+match.groups.num2)
    }
  }
  return sum
}

export function part2(){
  let text = read()
  text = text.join("")
  const regex = /(?<mul>mul[(](?<num1>\d+),(?<num2>\d+)[)])|(?<do>do[(][)])|(?<dont>don[']t[(][)])/gm
  let sum = 0

  let filtered = text.matchAll(regex)

  let doMultiply = true
  for(const match of filtered){
    console.log(match[0])
    if(match.groups.do){
      console.log("keep multiplying")
      doMultiply = true
    }

    if(match.groups.dont){
      console.log("stop multiplying")
      doMultiply = false
    }

    if(match.groups.mul && doMultiply){
      console.log("multiplying")
      sum += (+match.groups.num1) * (+match.groups.num2)
    }
  }
  return sum
}

// first part 1 try, it did succeed
// export function part1(){
//   let text = read()
//   text = text.join("")
//   const regex = /mul[(]\d+,\d+)[)]/gm;
//   const numregex = /\d+/gm
//   let sum = 0

//   let filtered = text.matchAll(regex)

//   filtered = [...filtered].map(m => m[0])
//   console.log(filtered)
//   let filteredText = filtered.join("")
//   console.log(filteredText)
//   let numbers = filteredText.matchAll(numregex)
//   numbers = [...numbers].map(m => +m[0])

//   for(let i = 0; i < numbers.length; i += 2){
//     console.log(`multiplying ${numbers[i]} with ${numbers[i+1]}`)
//     let mul = numbers[i] * numbers[i+1]
//     sum += mul
//   }
//   return sum
// }