import { readFileSync } from 'node:fs';

function read(){
  const __dirname = import.meta.dirname
  let text = readFileSync(`${__dirname}/input.txt`, 'utf8');
  text = text.trim()
  let splitText = text.split("\n")
  return splitText
}

export function part1(){
  let something = read()
  return something
}

export function part2(){
  let something = read()
  return something
}