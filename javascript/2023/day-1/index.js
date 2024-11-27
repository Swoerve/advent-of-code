const fs = require('node:fs');

fs.readFile('input2.txt', (err, data) => {
    if (err) throw err;
    solver2(data.toString())
});


function solver(text) {
    let textualNumbers = [{ "strung": "one", "numeric": 1 }, { "strung": "two", "numeric": 2 }, { "strung": "three", "numeric": 3 }, { "strung": "four", "numeric": 4 }, { "strung": "five", "numeric": 5 }, { "strung": "six", "numeric": 6 }, { "strung": "seven", "numeric": 7 }, { "strung": "eight", "numeric": 8 }, { "strung": "nine", "numeric": 9 }]
    console.log(text)
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
        console.log("first: " + first)
        console.log("last: " + last)
        sum += Number(first + last)
        console.log("sum: " + sum)
        console.log(element)
    });
    console.log(sum)
}

function solver2(text) {
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
        console.log("Line: " + line)
        for (let ii = 0; ii < splut.length; ii++) {
            pattern.lastIndex = ii
            const match = pattern.exec(line)
            console.log("Match: " + match)
            if (!match) continue
            const namedValue = numNames.findIndex((name) => name === match[0]);
            console.log("namedValue: " + namedValue)
            nums.push(namedValue > 0 ? `${namedValue}` : match[0]);
        }
        console.log("sum the num: " + +(nums[0] + nums.at(-1)))
        allNums.push(+(nums[0] + nums.at(-1)))
    })

    allNums.forEach((num) => sum += +num)




    console.log(allNums)
    console.log("Sum: " + sum)
}
