var displayedImage = document.querySelector('.displayed-img');
var thumbBar = document.querySelector('.thumb-bar');

var btn = document.querySelector('button');
var overlay = document.querySelector('.overlay');

/* Looping through images */
for (let i = 1; i <= 5; i++) {
    var newImage = document.createElement('img');
    newImage.setAttribute('src', 'images/pic' + i + '.jpg');
    thumbBar.appendChild(newImage);

    // newImage onclick event handler
    newImage.onclick = function (event) {
        // reference to src attribute of image clicked on
        var imageSource = event.target.getAttribute('src');
        // set displayedImage to image clicked on
        setDisplayedImage(imageSource);
    };
};

function setDisplayedImage(source) {
    displayedImage.setAttribute('src', source);
}

/* Wiring up the Darken/Lighten button */
btn.onclick = function () {
    if (this.getAttribute('class') === 'dark') {
        this.setAttribute('class', 'light');
        this.textContent = 'Lighten';
        overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
    } else {
        this.setAttribute('class', 'dark');
        this.textContent = 'Darken';
        overlay.style.backgroundColor = 'rgba(0,0,0,0)';
    }
};

