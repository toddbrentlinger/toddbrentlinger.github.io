var myHeading = document.querySelector('h1');
myHeading.textContent = 'Hello World!';

var myImage = document.querySelector('img');

myImage.onclick = function () {
    var mySrc = myImage.getAttribute('src');
    if (mySrc === '../images/todd-brentlinger-profile-pic.jpg') {
        myImage.setAttribute('src', '../images/james_bond_backdrop_opinion.jpg');
        myImage.setAttribute('width', '400');
        myImage.setAttribute('height', '250');
    } else {
        myImage.setAttribute('src', '../images/todd-brentlinger-profile-pic.jpg');
        myImage.setAttribute('width', '250');
        myImage.setAttribute('height', '250');
    }
}

// Generate random number between 0-number
function random(number) {
    return Math.floor(Math.random() * number);
}