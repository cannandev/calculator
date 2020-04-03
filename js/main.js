/**
 * Variables
 */
// Declare variables for calculator, display and keys container
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
  keysArray = [index, ...keysArray] // use spread to concat operators and 0-9 to beginning of keys array
}

// Append keys to keys container
keysArray.forEach(key => {
  const button = document.createElement('button')
  button.setAttribute('data-key', key)
  // set content for all keys
  if (key === 'plus' || key === 'minus' || key === 'times' || key === 'divide') {
    button.innerHTML = `&${key};`
    button.setAttribute('data-operator', true)
    button.setAttribute('data-key', key)
  } else if (key === 'clear') {
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
  let keyPressed = e.target
  if (keyPressed.matches('button[data-operator]')) {
    return // Use an early return if key pressed does not have data-key atty
  }
  display.textContent = display.textContent + e.target.dataset.key
  // @?: How to replace display. Use fragment???

  // @TODO: check if keyPressed is an operator
})

// If button is an operator, perform operation (a function that accepts two params)
