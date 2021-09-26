
// Getting all the relevent HTML elements so we can use them
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const deleteButton = document.querySelector('[data-delete]')
const clearAllButton = document.querySelector('[data-all-clear]')
const equalsButton = document.querySelector('[data-equals]')
const currentNumberHtmlElement = document.querySelector('[data-current-operand]')
const previousNumberHtmlElement = document.querySelector('[data-previous-operand]')


// Creating a class for the calculator as a template for it so the code knows where certain values go
class Calculator {
    constructor(currentNumberHtmlElement, previousNumberHtmlElement) {
        this.previousNumberHtmlElement = previousNumberHtmlElement
        this.currentNumberHtmlElement = currentNumberHtmlElement
        this.clearAll()
    }
    // Below will be all the functions we require
    
    // This function clears the calculator completely 
    clearAll() {
        this.currentNumber = ''
        this.previousNumber = ''
        this.operation = undefined
    }

    // This function deletes the latest typed integer
    delete() {
        this.currentNumber = this.currentNumber.toString().substring(0, this.currentNumber.length -1)
    }

    // This function prevents more than one decimal point from being typed and joins all current number integers/decimal points being typed together and into a string to prevent an actual operation from being done
    numberToString(number) {
        if(number === '.' && this.currentNumber.includes('.')) return
        this.currentNumber = this.currentNumber.toString() + number.toString()
    }

    // If currentNumber is empty then do not run anything
    // If previousNumber is not empty then run the compute function
    // Assign the innertext of the chosen operation button to this.operation 
    // Assign the currentNumber to the previousNumber and clear the current number (this is done so that after the operation has been chosen the second number number can be typed into the currentNumber position)
    chosenOperation(operation) {
        if(this.currentNumber === '') return
        if(this.previousNumber !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousNumber = this.currentNumber
        this.currentNumber = ''
    }

    // We create an equation variable but assign nothing specific to it seeing as it could equal a few different things depending on what operator the user chose (as you will see a few lines further down)
    // We turn the previousNumber and currentNumber into floating point numbers
    // Switch statement is checked and then runs whichever equation corresponds to the operation the user chose
    // When equation is run the result is shown in the currentNumber position and the previousNumber and operation is cleared
    compute() {
        let equation
        const previous = parseFloat(this.previousNumber)
        const current = parseFloat(this.currentNumber)
        if(isNaN(previous) || isNaN(current)) return
        switch(this.operation) {
          case '+':
            equation = previous + current
            break;
          case '-': 
            equation = previous - current
            break;
          case '*':
            equation = previous * current
            break;
          case '÷':
            equation = previous / current
            break;
          default:
            return
        }
        this.currentNumber = equation
        this.operation = undefined
        this.previousNumber = ''
    }

    // Splitting the current into two parts (all numbers before the decimal point and all numbers after the decimal point)
    // Declaring a beforeDecimalPointDisplay variable as it could equal nothing as well as a 'number'
    // If beforeDecimalPointDisplay is not a number then it will equal nothing, however if otherwise then convert it into a string with 0 decimal digits (any number to the right of a decimal point)
    // If afterDecimalPoint digits do not exist then only return the beforeDecimalPointDisplay, otherwise return beforeDecimalPointDisplay and afterDecimalPoint joined together by a decimal point between them
    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const beforeDecimalPoint = parseFloat(stringNumber.split('.')[0])
        const afterDecimalPoint = stringNumber.split('.')[1]
        let beforeDecimalPointDisplay
        if(isNaN(beforeDecimalPoint)) {
            beforeDecimalPointDisplay = ''
        } else {
            beforeDecimalPointDisplay = beforeDecimalPoint.toLocaleString('en', {maximumFractionDigits: 0})
        }
        if(afterDecimalPoint != null) {
            return `${beforeDecimalPointDisplay}.${afterDecimalPoint}`
        } else {
            return beforeDecimalPointDisplay
        }
    }

    // Displays the number returned by the getDisplayNumber function in the innertext of the currentnumberhtmlelement
    // If however an operation has been chosen then the innertext of the previousnumberhtmlelement is the number returned by the getdisplaynumber function and the operation the user chose with a space inbetween them. If an operation has not been chosen then the innertext of the previousnumberhtmlelement should stay blank
    updateDisplay() {
        this.currentNumberHtmlElement.innerText = this.getDisplayNumber(this.currentNumber)
      if(this.operation != null) {
        this.previousNumberHtmlElement.innerText = `${this.getDisplayNumber(this.previousNumber)} ${this.operation}`
      } else {
          this.previousNumberHtmlElement.innerText = ''
      }
    }
}

// Now we create a variable of calculator so we can interact with the calculator class
const calculator = new Calculator(currentNumberHtmlElement, previousNumberHtmlElement)

// Loops through all number buttons and listens for a button to be clicked. It passes the correlating number to the appendNumber function. The updateDisplay function is also called each time a button is clicked. 
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.numberToString(button.innerText)
      calculator.updateDisplay()
    })
  })
  
  // Loops through all operation buttons and listen for a button to be clicked. It passes the correlating number to the chooseOperation function, and calls the updateDisplay function on every click as well. 
  operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chosenOperation(button.innerText)
      calculator.updateDisplay()
    })
  })

  // Listens for the equal button to be clicked and calls the compute and updateDisplay function when it is clicked. 
  equalsButton.addEventListener('click', button => {
      calculator.compute()
      calculator.updateDisplay()
  })

  // Listens for the clear all button to be clicked and calls the clear and update display functions
  clearAllButton.addEventListener('click', button => {
    calculator.clearAll()
    calculator.updateDisplay()
})

// Listens for the delete function to be clicked and calls the delete and updateDisplay functions
deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})



































































































