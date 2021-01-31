let add = (num1, num2) => num1 + num2;

let subtract = (num1, num2) => num1 - num2;

let multiply = (num1, num2) => num1 * num2;

let divide = (num1, num2) => num1 / num2;

function operate(operator, num1, num2) {
    switch(operator){
        case '+':
            console.log('hello');
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

console.log(operate('+',3,4));