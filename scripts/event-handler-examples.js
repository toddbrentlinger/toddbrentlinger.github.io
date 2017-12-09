/* ---------- Event Handler: onclick ---------- */

var container = document.getElementById('event-handler-onclick');
var heading = container.querySelector('h2');
var btn = container.querySelector('button');

function random(num) {
    return Math.floor(Math.random() * (num + 1));
}

function randomColor() {
    return 'rgb(' + random(255) + ',' + random(255) + ',' + random(255) + ')';
}

btn.addEventListener('click', function () {
    container.style.backgroundColor = randomColor();
    heading.style.color = randomColor();
});

/* ---------- Event Handler: onclick II ---------- */

// get reference to element
var eventHandler2Section = document.getElementById('event-handler-onclick-2');

// add 16 divs to section
for (let i = 1; i <= 16; i++) {
    eventHandler2Section.appendChild(document.createElement('div'));
}

// second random function
function random2(number) {
    return Math.floor(Math.random() * number);
}

// array of each div
var divs = eventHandler2Section.querySelectorAll('div');

// add second random function to event attribute of each div
for (let i = 0; i < divs.length; i++) {
    divs[i].onclick = function (e) {
        e.target.style.backgroundColor = randomColor();
    }
}