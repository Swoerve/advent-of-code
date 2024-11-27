import { readFileSync } from 'node:fs';

function read(){
    const __dirname = import.meta.dirname
    return readFileSync(`${__dirname}/input.txt`, 'utf8');
  }



export function part1() {
    let text = read()
    let textualNumbers = [{ "strung": "one", "numeric": 1 }, { "strung": "two", "numeric": 2 }, { "strung": "three", "numeric": 3 }, { "strung": "four", "numeric": 4 }, { "strung": "five", "numeric": 5 }, { "strung": "six", "numeric": 6 }, { "strung": "seven", "numeric": 7 }, { "strung": "eight", "numeric": 8 }, { "strung": "nine", "numeric": 9 }]

    let splitText = text.split("\n")
    let sum = 0
    for (let i = 0; i < splitText.length; i++) {
        textualNumbers.forEach(num => {
            splitText[i].split('').forEach((char, ii) => {
                let restLine = splitText[i].slice(ii)
                restLine = /\d/.test(char) ? restLine : restLine.replace(num.strung, num.numeric);

                splitText[i] = char + restLine
            })
        })
    }
    splitText.forEach(element => {
        let first = element.match("[0-9]")
        // element = element.split("").reverse().join("")
        let last = element.match("[0-9]")

        sum += Number(first + last)

    });
    return sum
}

export function part2() {
    let text = read()
    let sum = 0
    let allNums = []
    const numNames = [
        '\\d',
        'one', // The index position of the number's name is also its numeric value!
        'two',
        'three',
        'four',
        'five',
        'six',
        'seven',
        'eight',
        'nine',
    ];
    const pattern = new RegExp(numNames.join('|'), "y")

    let textt = text.trim().split(/\n/g)

    textt.forEach((line, i) => {
        let nums = []
        let splut = line.split('')

        for (let ii = 0; ii < splut.length; ii++) {
            pattern.lastIndex = ii
            const match = pattern.exec(line)

            if (!match) continue
            const namedValue = numNames.findIndex((name) => name === match[0]);

            nums.push(namedValue > 0 ? `${namedValue}` : match[0]);
        }

        allNums.push(+(nums[0] + nums.at(-1)))
    })

    allNums.forEach((num) => sum += +num)

    return sum
}
