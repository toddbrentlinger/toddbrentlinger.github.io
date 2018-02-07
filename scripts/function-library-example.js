var input = document.querySelector('#function-library-example .number-input');
var para = document.querySelector('#function-library-example p');

function squared(num) {
    return num * num;
}

function cubed(num) {
    return num * num * num;
}

function factorial(num) {
    let x = num;
    while (x > 1) {
        num *= x - 1;
        x--;
    }
    return num;
}

function squareRoot(num) {
    return Math.sqrt(num);
}

function cubeRoot(num) {
    return Math.cbrt(num);
}

function circleCircumference(num) {
    return 2 * Math.PI * num;
}

function randomNum(num) {
    return Math.floor(Math.random() * num);
}

// set paragraph style white-space to pre-line so text will wrap on line breaks
para.setAttribute('style', 'white-space: pre-line;');

input.onchange = function () {
    let num = input.value;
    // check if num is not a number, then display error message
    if (isNaN(num)) {
        para.textContent = 'You need to enter a number!';
    } else {
        para.textContent = num + ' squared is ' + squared(num) + '. \r\n' +
        num + ' cubed is ' + cubed(num) + '. \r\n' +
        num + ' factorial is ' + factorial(num) + '. \r\n' +
        num + ' square root is ' + squareRoot(num) + '. \r\n' +
        num + ' cube root is ' + cubeRoot(num) + '. \r\n' +
        'Circumeference of circle using radius ' + num + ' is ' + circleCircumference(num) + '. \r\n' + 
        'Random number between 0 and ' + num + ' is ' + randomNum(num) + '.';
    }
}