
/* Main Dev Tools Panel */

// create window panel to hold developer tools
var panel = document.createElement('div');

// style dev tools panel
panel.style.position = "fixed";
panel.style.bottom = "0";
panel.style.left = "0";
panel.style.maxWidth = "30%";
panel.style.margin = "0 auto";
panel.style.backgroundColor = "#dbe9ee";
panel.style.border = "3px solid #466995";
panel.style.padding = "0.3em";

// add dev tools panel to document
document.querySelector('html').appendChild(panel);

/* Header for Dev Tools Panel */

var header = document.createElement('h3');
header.style.margin = "0.3em";
header.style.textAlign = "center";
header.textContent = "Dev Tools";
panel.appendChild(header);

/* Display Window Size */

// Function: add paragraph element to dev tools panel
function AddParagraph() {
    // create paragraph element to display window dimension
    var para = document.createElement('p');
    // add paragraphs to dev tools panel
    panel.appendChild(para);
    // style paragraph
    para.style.margin = "0";
    // return reference to para element
    return para;
}

// create paragraph elements to display window size
var windowWidthPara = AddParagraph(),
    windowHeightPara = AddParagraph();

// Function: display inner dimensions of window on paragraph
function GetInnerWindowDimensions() {
    
    windowWidthPara.textContent = 'Inner Viewport Width: ' + window.innerWidth + 'px';
    windowHeightPara.textContent = 'Inner Viewport Height: ' + window.innerHeight + 'px';
}
// run function when script loads initially
GetInnerWindowDimensions();

// on window resize, run function to reset the inner window dimensions
window.onresize = GetInnerWindowDimensions;

/* Resize Font */

// label element
var label = document.createElement('label');
label.setAttribute('for', 'font-size');
label.textContent = 'Font Size: ';
panel.appendChild(label);

// input element
var input = document.createElement('input');
input.setAttribute('type', 'text');
input.id = 'font-size';
panel.appendChild(input);

// button element
var button = document.createElement('button');
button.textContent = 'Submit';
panel.appendChild(button);

// Function: update font-size depending on input value
button.onclick = function () {
    var submission = input.value;
    // if input value is number, add px to end
    if (Number(submission)) {
        document.querySelector('html').style.fontSize = submission + 'px';
    } else { // else add value as is
        document.querySelector('html').style.fontSize = submission;
    }
    
};