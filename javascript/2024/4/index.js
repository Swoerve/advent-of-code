import { readFileSync } from 'node:fs';

function read(){
  const __dirname = import.meta.dirname
  let text = readFileSync(`${__dirname}/input.txt`, 'utf8');
  text = text.trim()
  let splitText = text.split("\n")
  return splitText
}
let grid
export function part1(){
  let data = read()
  grid = gridify(data)
  const rows = grid.length;
  const cols = grid.at(0).length;
  let targetWord = "XMAS"
  const directionsMap = [
    [0,1], // (Horizontal forward)
    [0, -1], // (Horizontal backward)
    [1, 0], // Vertical (down)
    [-1, 0], // Vertical (up)
    [1, 1], // Diagonal (down-right)
    [-1, -1], // Diagonal (up-left)
    [1, -1], // Diagonal (down-left)
    [-1, 1], // Diagonal (up-right)
  ]
  let xmasCount = 0
  
  function isWordAtPostition(startRow, startCol, dirRow, dirCol) {
    for (let i = 0; i < targetWord.length; i++) {
        const newRow = startRow + i * dirRow
        const newCol = startCol + i * dirCol
        if (
            newRow < 0 || newRow >= rows || // Check for row boundaries
            newCol < 0 || newCol >= cols || // Check for column boundaries
            grid[newRow][newCol] !== targetWord[i] // Check if characters match
        ) {
            return false
        }
    } 
    return true
  }

  grid.forEach((line, row) => {
    line.forEach((char, col) => {
        for (const [dirRow, dirCol] of directionsMap) {
            if (isWordAtPostition(row, col, dirRow, dirCol)) {
                xmasCount++
            }
        }
    })
  })
  return xmasCount
}

export function part2(){
  let data = read()
  let grid = gridify(data)
  let xCount = 0

  grid.forEach((line, row) => {
    row -= 1
    grid.forEach((char, col) => {
      col -= 1
      if(row > 0 && col > 0){
        // x shape in y,x
        // 1,-1   1,1
        //      0
        // -1,-1  1,-1
        let xString = grid[row-1][col-1] + grid[row][col] + grid[row+1][col+1] + grid[row+1][col-1] + grid[row][col] + grid[row-1][col+1]
        if(xString === "SAMSAM" || xString === "SAMMAS" || xString === "MASSAM" || xString === "MASMAS"){
          xCount += 1
        }
      }
    })
  })
  return xCount
}

function gridify(data){
  let grid = []
  data.forEach(line => {
    grid.push(line.split(""))
  })
  return grid
}