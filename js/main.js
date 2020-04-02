/**
 * Variables
 */
// Declare variables for calculator, display and keys container
const calculator = document.querySelector('.calculator')
const display = calculator.querySelector('.calculator__display')
const keysContainer = calculator.querySelector('.calculator__keys')
const operators = ['plus', 'minus', 'times', 'divide']
let keysArray = ['clear', 'equal', 'decimal']	// prepend 0-9 dynamically.
// @? Are clear and equal operators or keys?

/**
 * Functions
 */

// Append operators (+-/*) to keys container
operators.forEach(operator => {
  const button = document.createElement('button')
  button.innerHTML = `&${operator};`
  button.setAttribute('data-operator', operator)
  keysContainer.appendChild(button)
})

// Concat 0-9 with clear, equal and decimal in array
for (let index = 0; index < 10; index++) {
  keysArray = [index, ...keysArray] // use spread operator to add 0-9 to beginning of keys array
}

// Append keys to keys container
keysArray.forEach(key => {
  const button = document.createElement('button')
  button.setAttribute('data-key', key)
  // set content for all keys
  // use an early return here if a function?
  if (key === 'clear') {
    button.textContent = 'AC'
  } else if (key === 'equal') {
    button.innerHTML = `&${key}s;`
  } else if (key === 'decimal') {
    button.textContent = '.'
  } else {
    button.textContent = key
  }
  keysContainer.appendChild(button)
})

// Add event listener to 1) get button textContent and 2) set in display
// Use event delegation on keys container. Listen for fired event
keysContainer.addEventListener('click', e => {
  let keyPressed = e.target.dataset.key
  display.textContent = keyPressed
  // @? append to display???
})

// If button is an operator, perform operation (a function that accepts two params)
