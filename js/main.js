/**
 * Variables
 */
const calculator = document.querySelector('.calculator')
const display = calculator.querySelector('.calculator__display')
const keysContainer = calculator.querySelector('.calculator__keys')
const operators = ['plus', 'minus', 'times', 'divide']
let keysArray = [...operators, 'clear', 'equal', 'decimal'] // prepend 0-9 later.

/**
 * Functions
 */

// Concat 0-9 with clear, equal and decimal in array
for (let index = 0; index < 10; index++) {
  keysArray = [index, ...keysArray] // use spread to concat operators and 0-9. Make into a helper function?
}

// Append keys to keys container
keysArray.forEach(key => {
  const button = document.createElement('button')
  button.setAttribute('data-key', key)
  // set content and attys for all keys
  if (key === 'plus' || key === 'minus' || key === 'times' || key === 'divide') {
    button.innerHTML = `&${key};`
    button.setAttribute('data-action', 'operator')
    button.setAttribute('data-key', key)
  } else if (key === 'clear') {
    button.textContent = 'AC'
  } else if (key === 'equal') {
    button.innerHTML = `&${key}s;`
  } else if (key === 'decimal') {
    button.textContent = '.'
  } else {
    button.textContent = key
    button.setAttribute('data-action', 'number')
  }
  keysContainer.appendChild(button)
})

// Use event delegation on keys container. Listen for fired event to 1) get button textContent and 2) set in display
keysContainer.addEventListener('click', e => {
  const keyPressed = e.target
  const result = display.textContent
  const operatorKeys = [...keysContainer.children].filter(key => key.dataset.action === 'operator')
  const { action, key } = keyPressed.dataset // destructured elements assignments
  const { previousAction, previousResult, currentOperator } = calculator.dataset // Zell defines firstValue and operator in equals block

  // When a new key is clicked, clear selected operator
  operatorKeys.forEach(key => {
    key.classList.remove('is-pressed')
  })

  if (action === 'number') {
    // Replace initial zero with number pressed
    if (result === '0') {
      display.textContent = key
      // key. === 'clear').textContent = 'CE'
    } else {
      // Concat numbers pressed
      display.textContent = result + key
    }

    if (previousAction === 'operator') {
      display.textContent = key
    }
  }
  if (action === 'operator') {
    keyPressed.classList.add('is-pressed')
    calculator.dataset.previousResult = result
    calculator.dataset.currentOperator = key
  }
  if (action !== 'operator') {
    const clearButton = keysContainer.querySelector('button[data-key=clear')
    clearButton.textContent = 'C'
  }
  if (key === 'decimal') {
    // if (result.includes('.')) {
    //   return // TODO: Stop user from entering decimal twice. Need to fix float first.
    // }
    display.textContent = result + keyPressed.textContent
  }
  if (key === 'clear') {
    if (keyPressed.textContent === 'AC') {
      delete calculator.dataset.previousAction // ? If delete destructured variable, get strict mode error
      delete calculator.dataset.currentOperator
    }

    display.textContent = '0'
    keyPressed.textContent = 'AC'
  }
  if (key === 'equal') {
    // console.log(`${previousResult} ${currentOperator} ${result}`)
    display.textContent = calculate(previousResult, currentOperator, result)
  }

  calculator.dataset.previousAction = action // ? how come this doesn't get an already a const error?
})

const calculate = (num, operator, num2) => {
  let expression = ''
  num = parseFloat(num) // This actually doesn't give accurate calcs with decimals.
  num2 = parseFloat(num2)

  switch (operator) { // Zell uses multiple if statements
    case 'plus':
      expression = (num + num2)
      break
    case 'minus':
      expression = (num - num2)
      break
    case 'times':
      expression = (num * num2)
      break
    case 'divide':
      expression = (num / num2)
  }
  return expression
}
