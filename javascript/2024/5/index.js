
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
  let correctCount = 0
  let orders = something.toSpliced(something.indexOf(""))
  orders = orders.map((line) => {
    return line.split("|")
  })

  // is x before y, x | y

  let pageUpdates = something.toSpliced(0, something.indexOf("") + 1)

  function getAllOrders(arr, val) {
    var indexes = []
    arr.forEach(elem => {
      if(elem.includes(val)){
        indexes.push(elem)
      }
    })
    return indexes;
  }

  function checkOrder(arr, left, right){
    let leftindex = arr.indexOf(left)
    console.log(left)
    console.log(`left: ${leftindex}`)
    let rightindex = arr.indexOf(right)
    console.log(right)
    console.log(`right: ${rightindex}`)
    if(leftindex < rightindex){
      return true
    }
    return false
  }

  pageUpdates.forEach(update => {
    update = update.split(",")
    console.log(update)
    let correct = []
    for(let i = 0; i < update.length; i++){
      let relevantOrders = getAllOrders(orders, update[i])
      relevantOrders.forEach(order => {
        if(update.includes(order[0]) && update.includes(order[1])){
          console.log(order)

          //console.log("if check")
          //console.log(order.indexOf(update[i]))
          if(order.indexOf(update[i]) === 0){
            correct.push(checkOrder(update, update[i], order[1]))
          } else {
            correct.push(checkOrder(update, order[0], update[i]))
          }
          //console.log(correct)
          
        }
      })
      
      //console.log(relevantOrders)
      console.log(correct)
    }
    function isAllCorrect(){
      let falseFlag = false
      correct.forEach(cor => {
        console.log(cor)
        if(!cor){
          console.log("returning false")
          falseFlag = true
        }
      })
      console.log("returning true")
      if(falseFlag){
        return false
      }
      return true
    }
    if(isAllCorrect()){
      console.log("is correct")
      console.log(update[Math.floor(update.length / 2)])
      correctCount += +update[Math.floor(update.length / 2)]
    }
  })
  return correctCount
  //return JSON.stringify(orders)
}

export function part2(){
  let something = read()
  let correctCount = 0
  let orders = something.toSpliced(something.indexOf(""))
  orders = orders.map((line) => {
    return line.split("|")
  })

  // is x before y, x | y

  let pageUpdates = something.toSpliced(0, something.indexOf("") + 1)

  function getAllOrders(arr, val) {
    var indexes = []
    arr.forEach(elem => {
      if(elem.includes(val)){
        indexes.push(elem)
      }
    })
    return indexes;
  }

  function checkOrder(arr, left, right){
    let leftindex = arr.indexOf(left)
    console.log(left)
    console.log(`left: ${leftindex}`)
    let rightindex = arr.indexOf(right)
    console.log(right)
    console.log(`right: ${rightindex}`)
    if(leftindex < rightindex){
      return true
    }
    return false
  }

  pageUpdates.forEach(update => {
    update = update.split(",")
    console.log(update)
    let correct = []
    let relevantOrders = []
    for(let i = 0; i < update.length; i++){
      relevantOrders = getAllOrders(orders, update[i])
      relevantOrders.forEach(order => {
        if(update.includes(order[0]) && update.includes(order[1])){
          console.log(order)

          //console.log("if check")
          //console.log(order.indexOf(update[i]))
          if(order.indexOf(update[i]) === 0){
            correct.push(checkOrder(update, update[i], order[1]))
          } else {
            correct.push(checkOrder(update, order[0], update[i]))
          }
          //console.log(correct)
          
        }
      })
      
      //console.log(relevantOrders)
      console.log(correct)
    }
    function isAllCorrect(){
      let falseFlag = false
      correct.forEach(cor => {
        console.log(cor)
        if(!cor){
          console.log("returning false")
          falseFlag = true
        }
      })
      console.log("returning true")
      if(falseFlag){
        return false
      }
      return true
    }

    const compare = (rules) => (a, b) => {
      const rule = rules.find((rule) => rule.includes(a) && rule.includes(b))
      if (!rule) {
        return 0
      }
      return rule[0] === a ? -1 : 1
    }


    if(!isAllCorrect()){
      console.log("is not correct")
      let sortedUpdate = update.toSorted(compare(orders))

      correctCount += +sortedUpdate[Math.floor(sortedUpdate.length / 2)]
    }
  })
  return correctCount
}