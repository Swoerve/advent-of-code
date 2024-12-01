import { readFileSync } from 'node:fs';

function read(){
  const __dirname = import.meta.dirname
  let text = readFileSync(`${__dirname}/input.txt`, 'utf8');
  text = text.trim()
  let splitText = text.split("\n")
  return splitText
}

export function part1(){
  let data = read()
  let splitData = []
  data.forEach(line => {
    splitData.push(line.split(" "))
  })
  let left = []
  splitData.forEach(line => {
    left.push(line[0])
  })
  let right = []
  splitData.forEach(line => {
    right.push(line[3])
  })
  left.sort()
  right.sort()
  let differences = []
  left.forEach((num, i) => {
    differences.push(Math.abs(right[i] - num))
  })
  let sum = 0
  differences.forEach(n => {
    sum += n
  })
  return sum
}

export function part2(){
  let data = read()
  let splitData = []
  data.forEach(line => {
    splitData.push(line.split(" "))
  })
  let left = []
  splitData.forEach(line => {
    left.push(line[0])
  })
  let right = []
  splitData.forEach(line => {
    right.push(line[3])
  })
  left.sort()
  right.sort()
  let similarityScore = 0
  left.forEach((n, i) => {
    let similarity = 0
    right.forEach(n2 => {
      if(n === n2){
        similarity += 1
      }
    })
    similarityScore += n * similarity
  })
  return similarityScore
}