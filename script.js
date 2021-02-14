let add = (num1, num2) => num1 + num2;

let subtract = (num1, num2) => num1 - num2;

let multiply = (num1, num2) => num1 * num2;

let divide = (num1, num2) => num1 / num2;

let buttonEnteredValues = [];
let displayValue = 0;
let display = document.getElementById("displayDigits");

addButtonActions();


function addButtonActions(){
    let buttons = document.getElementsByClassName("calculatorButton");
    let i;
    for(i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener("click", pressButton);
    }
    
}

function operate(operator, num1, num2) {
    switch(operator){
        case '+':
            return add(num1, num2);
        case '-':
            subtract(num1, num2);
            break;
        case '*':
            multiply(num1, num2);
        case '/':
            divide(num1, num2);
    }
}

function pressButton() {
    buttonEnteredValues.push(this.innerHTML);
    console.log(buttonEnteredValues);
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