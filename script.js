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
let numericalButtons = document.getElementsByClassName("numericalButton");
let operatorButtons = document.getElementsByClassName("operatorButton");
let equalsButton = document.getElementById("equalsButton");
let clearButton = document.getElementById("clearButton");
let deleteButton = document.getElementById("deleteButton");


addButtonActions();


function addButtonActions(){
    // add event listeners to all buttons that trigger their respective functions on click
    for(let i = 0; i < numericalButtons.length; i++) {
            numericalButtons[i].addEventListener("click", pressNumericalButton);
    }
    for(let i = 0; i < operatorButtons.length; i++) {
        operatorButtons[i].addEventListener("click", pressOperatorButton);
    }
    equalsButton.addEventListener("click", pressEqualsButton);
    clearButton.addEventListener("click", clearAll);
    deleteButton.addEventListener("click", deleteLastValue);
}

function operate(operator, num1, num2) {
    // calculates result depending on operator
    switch(operator){
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            if(num2 == 0){
                displayValue = "Undefined";
                updateDisplay();
                clearAll();
                return;
            }
            return divide(num1, num2);
    }
}

function pressNumericalButton() {
    // pushes entered number to number array, updates display and displayValue
    buttonEnteredValues.push(this.innerHTML);
    updateDisplayValue();
    updateDisplay();
}

function pressOperatorButton() {
    // if no calculations have been performed, update operand1 and set operator
    if(operand1 == null) {
        convertDisplayValue();
        setOperand1();
        clearCurrentNumbersArray();
        setOperator(this.value);
        return;
    }
    else {
        // Update operator if null, or if no numbers entered after last operator pressed
        if(!currentOperator || (buttonEnteredValues.length < 1)){
            setOperator(this.value);
            return;
        }
        calculate();
        setOperator(this.value);
    }

}

function pressEqualsButton() {
    // do nothing if operand1 is null
    if(operand1 == null) {
        return;
    }
    else {
        // calculate result if there is a current operator and if numbers have been entered
        if(currentOperator && (buttonEnteredValues.length > 0)) {
            calculate();
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

function deleteLastValue() {
    // removes last entered value

    // does nothing if no values entered
    if(buttonEnteredValues.length == 0){
        return;
    }

    // resets display to 0 if only 1 value
    if(buttonEnteredValues.length == 1){
        buttonEnteredValues.pop();
        displayValue = 0;
        updateDisplay();
        return;
    }

    // remove last value and update display
    buttonEnteredValues.pop();
    updateDisplayValue();
    updateDisplay();
}

function calculate() {
    /* helper function that calculates results, assigns it to displayValue, updates display
    clears current numbers, resets operand1 to answer, and nulls current operator and operand2 */
    convertDisplayValue();
    operand2 = displayValue;
    displayValue = operate(currentOperator, operand1, operand2);
    updateDisplay();
    clearCurrentNumbersArray();
    operand1 = displayValue;
    currentOperator = null;
    operand2 = null;
}

function updateDisplayValue() {
    // updates displayValue to last numbers entered since an operator button (or equals) was pressed
    displayValue = buttonEnteredValues.join("");
}

function convertDisplayValue(){
    // converts display value from string to float
    if(displayValue.length > 8){
        displayValue = parseFloat(displayValue).toExponential();
    }
    else{
        displayValue = parseFloat(displayValue);
    }
}

function updateDisplay() {
    // updates display to current displayValue 
    display.innerHTML = displayValue;
}

function setOperand1() {
    operand1 = displayValue;
    displayValue = null;
}

function clearCurrentNumbersArray() {
    buttonEnteredValues.length = 0;
}

function setOperator(value) {
    currentOperator = value;
}