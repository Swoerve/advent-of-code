import { readFileSync } from 'node:fs';

function read(){
  const __dirname = import.meta.dirname
  return readFileSync(`${__dirname}/input.txt`, 'utf8');
}

export function part1(){
  let something = read()
  return something
}

export function part1(){
  let something = read()
  return something
}