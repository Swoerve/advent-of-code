import { readFileSync } from 'node:fs';

function read(){
  const __dirname = import.meta.dirname
  return readFileSync(`${__dirname}/input.txt`, 'utf8');
}

let conditions = {
  red: 12,
  green: 13,
  blue: 14
}
let exceedsConditions = false
let result = 0

export function part1(){
  let record = read()
  record = record.split("\n")

  record.forEach((game, i) => {
    game = game.split(":")[1]

    exceedsConditions = false
    game.split(";").forEach(round => {
      let parts = round.trim().split(",")
      parts.forEach(split => {
        let splits = split.trim().split(" ")

        if(+splits[0] > conditions[`${splits[1]}`]){
          exceedsConditions = true

        }
      })
    })
    if(!exceedsConditions){

      result += i + 1
    }
  });
  return result
}

export function part2(){
  let record = read()
  record = record.split("\n")

  record.forEach((game, i) => {
    let highest = {
      red: 0,
      green: 0,
      blue: 0
    }

    game = game.split(":")[1]
    //console.log(game)
    exceedsConditions = false
    game.split(";").forEach(round => {
      let parts = round.trim().split(",")

      parts.forEach(split => {
        let splits = split.trim().split(" ")

        if(+splits[0] > highest[`${splits[1]}`]){
          highest[`${splits[1]}`] = +splits[0]
        }
      })
    })
    result += (highest.red * highest.green * highest.blue)
  });
  return result
}