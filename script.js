let add = (num1, num2) => num1 + num2;
let subtract = (num1, num2) => num1 - num2;
let multiply = (num1, num2) => num1 * num2;
let divide = (num1, num2) => num1 / num2;

let buttonEnteredValues = [];
let displayValue = null;
let display = document.getElementById("displayDigits");
let operand1 = null;
let operand2 = null;
let currentOperator;

addButtonActions();


function addButtonActions(){
    let numericalButtons = document.getElementsByClassName("numericalButton");
    let operatorButtons = document.getElementsByClassName("operatorButton");
    let equalsButton = document.getElementById("equalsButton");
    let clearButton = document.getElementById("clearButton"); 
    for(let i = 0; i < numericalButtons.length; i++) {
            numericalButtons[i].addEventListener("click", pressNumericalButton);
    }
    for(let i = 0; i < operatorButtons.length; i++) {
        operatorButtons[i].addEventListener("click", pressOperatorButton);
    }
    equalsButton.addEventListener("click", pressEqualsButton);
    clearButton.addEventListener("click", clearAll);
}

function operate(operator, num1, num2) {
    switch(operator){
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
    }
}

function pressNumericalButton() {
    buttonEnteredValues.push(this.innerHTML);
    updateDisplayValue();
    updateDisplay();
}

function updateDisplayValue() {
    displayValue = buttonEnteredValues.join("");
    displayValue = parseInt(displayValue);
}

function updateDisplay() {
    display.innerHTML = displayValue;
}

function pressOperatorButton() {
    // if no calculations have been performed, update operand1 and set operator
    if(operand1 == null) {
        setOperand1();
        setOperator(this.value);
        return;
    }
    else {
        // Update operator if null, or if no numbers entered after last operator pressed
        if(!currentOperator || (buttonEnteredValues.length < 1)){
            currentOperator = this.value;
            return;
        }
        operand2 = displayValue;
        displayValue = operate(currentOperator, operand1, operand2);
        updateDisplay();
        clearCurrentNumbersArray();
        operand1 = displayValue;
        currentOperator = this.value;
        operand2 = null;
    }

}

function setOperand1() {
    operand1 = displayValue;
    clearCurrentNumbersArray();
    displayValue = null;
}

function clearCurrentNumbersArray() {
    buttonEnteredValues.length = 0;
}

function pressEqualsButton() {
    console.log(buttonEnteredValues.length)
    console.log(currentOperator)
    if(operand1 == null) {
        return;
    }
    else {
        if(displayValue && currentOperator && (buttonEnteredValues.length > 0)) {
            operand2 = displayValue;
            displayValue = operate(currentOperator, operand1, operand2);
            updateDisplay();
            clearCurrentNumbersArray();
            operand1 = displayValue;
            currentOperator = null;
            operand2 = null;
        }
    }
}

function clearAll(){
    // resets display, operators, operands, and entered number array 
    displayValue = 0;
    operand1 = null;
    operand2 = null;
    setOperator(null);
    clearCurrentNumbersArray();
    updateDisplay();
}


function setOperator(value) {
    currentOperator = value;
}