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
  const previousAction = calculator.dataset.previousAction // TODO: Use destructured assignment later?

  // When a new key is clicked, clear selected operator
  operatorKeys.forEach(key => {
    key.classList.remove('is-pressed')
  })

  if (keyPressed.dataset.action === 'number') {
    // Replace initial zero with number pressed
    if (result === '0') {
      display.textContent = keyPressed.dataset.key
    } else {
      // Concat numbers pressed
      display.textContent = result + keyPressed.dataset.key
    }

    if (previousAction === 'operator') {
      display.textContent = keyPressed.dataset.key
    }
  }

  // Handle decimal and clear
  if (keyPressed.dataset.key === 'decimal') {
    display.textContent = result + keyPressed.textContent
    // TODO: do not allow multiple decimals. If !result.includes('.')?
  }

  if (keyPressed.dataset.key === 'clear') {
    display.textContent = '0'
  }

  if (keyPressed.dataset.action === 'operator') {
    keyPressed.classList.add('is-pressed')
  }
  calculator.dataset.previousAction = keyPressed.dataset.action
})
