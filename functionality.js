
// Acts as a black template for us and the program so we/it know/s where to pass values and so we have a cleared calculator.
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
      this.previousOperandTextElement = previousOperandTextElement
      this.currentOperandTextElement = currentOperandTextElement
      this.clear()
    }
  
    // When called deletes all values in the following fields, hence the empty quotes/undefined.
    clear() {
      this.currentOperand = ''
      this.previousOperand = ''
      this.operation = undefined
    }
  
    // Deletes the most recently entered integer/decimal point
    delete() {
      this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
  
    // If number passed is a decimal point and the current operand already contains a decimal point then return. Takes the numbers passed to it and converts them from an integer to a string as to avoid any unintended operations occuring at this point. 
    appendNumber(number) {
        if(number === '.' && this.currentOperand.includes('.')) return
      this.currentOperand = this.currentOperand.toString() + number.toString()
    }
  
    // If the current operand is nothing then return. If the previous operand does not equal nothing then run the compute function. Takes the operator symbol that was passed to it and assigns this.operation to operation so the program knows which operator we wish to use. Current operand is then turned into the previous operand position because obviously we wish to enter the next number in the current operand position. Current operand is then '' to clear the current operand position to make it clear for the next integer you type in. 
    chooseOperation(operation) {
        if(this.currentOperand === '') return
        if(this.previousOperand !== '') {
            this.compute()
        }
      this.operation = operation
      this.previousOperand = this.currentOperand
      this.currentOperand = ''
    }
  
    // Turns both operands back into floating point numbers. 
    // If either operand is not a number then return.
    // Run computation that correlates with the operation chosen by the user. If it is none of them then return.
    // When computation has been run then show it in the currentOperand position. Also clear both the operation and previousOperand positions. 
    compute() {
      let computation 
      const prev = parseFloat(this.previousOperand)
      const current = parseFloat(this.currentOperand)
      if(isNaN(prev) || isNaN(current)) return
      switch (this.operation) {
          case '+': 
            computation = prev + current
            break
          case '-':
            computation = prev - current
            break
          case '*':
            computation = prev * current
            break
          case '÷':
            computation = prev / current
            break
          default:
            return
      }
      this.currentOperand = computation
      this.operation = undefined
      this.previousOperand = ''
    }
  

    // Convert number that was chosen by the user to a string.
    // Split string number to all digits before the decimal point, and convert back to a floating point number
    // Split string number to all digits after the decimal point.
    // if integerDigits is not a number then integerDisplay equals nothing. If it is a number then integerDisplay equals integerDigits converted to a string (in default english format) while enforcing zero fraction digits aka 13.13 = "13".
    // If decimalDigits does not equal nothing then return integerDisplay var and decimalDigits var joined together as a string with a decimal point inbetween them. If decimalDigits equals nothing then just return the integerDisplay. 
    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0 })
         }
         if(decimalDigits != null) {
             return `${integerDisplay}.${decimalDigits}`
         } else {
             return integerDisplay
        }
    }
        
    // Inner text of the currentOperandTextElement equals the current operand run through the getDisplayNumber function. 
    // If operation does not equal nothing then inner text element of previousOperandTextElement equals previousOperand with a space and then the operation symbol chosen. If operation does equal nothing then the inner text of the previousOperandTextElement equals nothing. 
    updateDisplay() {
      this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
      if(this.operation != null) {
        this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
      } else {
          this.previousOperandTextElement.innerText = ''
      }
  }
}
  
  // Getting all the relevent elements so that we can use them
  const numberButtons = document.querySelectorAll('[data-number]')
  const operationButtons = document.querySelectorAll('[data-operation]')
  const equalsButton = document.querySelector('[data-equals]')
  const deleteButton = document.querySelector('[data-delete]')
  const allClearButton = document.querySelector('[data-all-clear]')
  const previousOperandTextElement = document.querySelector('[data-previous-operand]')
  const currentOperandTextElement = document.querySelector('[data-current-operand]')
  
  // Constant variable 'calculator' is the Calculator class and is created so we can interact with it
  const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)
  
  // Loops through all number buttons and listens for a button to be clicked. It passes the correlating number to the appendNumber function. The updateDisplay function is also called each time a button is clicked. 
  numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay()
    })
  })
  
  // Loops through all operation buttons and listen for a button to be clicked. It passes the correlating number to the chooseOperation function, and calls the updateDisplay function on every click as well. 
  operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
      calculator.updateDisplay()
    })
  })

  // Listens for the equal button to be clicked and calls the compute and updateDisplay function when it is clicked. 
  equalsButton.addEventListener('click', button => {
      calculator.compute()
      calculator.updateDisplay()
  })

  // Listens for the clear all button to be clicked and calls the clear and update display functions
  allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

// Listens for the delete function to be clicked and calls the delete and updateDisplay functions
deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})