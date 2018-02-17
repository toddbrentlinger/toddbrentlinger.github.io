// setup canvas

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

// Reference to paragraph element that holds current ball count
var para = document.querySelector('p');

// Variable to hold current count of balls, initialized to zero
var ballCount = 0;

// function to generate random number

function random(min, max) {
    var num = Math.floor(Math.random() * (max - min)) + min;
    return num;
}

// Shape constructor
function Shape(x, y, velX, velY, exists) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.exists = exists;
}

// Ball constructor; inherits from Shape object
function Ball(x, y, velX, velY, exists, color, size) {
    Shape.call(this, x, y, velX, velY, exists);

    this.color = color;
    this.size = size;
}

// Set Ball prototype using Object.create() method which creates 
// new object with specified prototype object and properties
Ball.prototype = Object.create(Shape.prototype);

// Set Ball constructor reference inside prototype since the previous 
// line changes the Ball's prototype constructor from Ball to Shape
Ball.prototype.constructor = Ball;

// Draw method on Ball prototype
Ball.prototype.draw = function () {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
}

// Update method on Ball prototype
Ball.prototype.update = function () {
    if ((this.x + this.size) >= width) {
        this.velX = -(this.velX);
    }

    if ((this.x - this.size) <= 0) {
        this.velX = -(this.velX);
    }

    if ((this.y + this.size) >= height) {
        this.velY = -(this.velY);
    }

    if ((this.y - this.size) <= 0) {
        this.velY = -(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
}

// Collision detect method on Ball prototype
Ball.prototype.collisionDetect = function () {
    for (var i = 0; i < balls.length; i++) {
        if (!(this === balls[i])) {
            var dx = this.x - balls[i].x;
            var dy = this.y - balls[i].y;
            var distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.size + balls[i].size) {
                balls[i].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')';
            }
        }
    }
}

// EvilCircle constructor
function EvilCircle(x, y, exists) {
    Shape.call(this, x, y, exists);

    this.color = 'white';
    this.size = 10;
    this.velX = 20;
    this.velY = 20;
}

// Set EvilCircle prototype using Object.create() method which creates 
// new object with specified prototype object and properties
EvilCircle.prototype = Object.create(Shape.prototype);

// Set EvilCircle constructor reference inside prototype since the previous 
// line changes the EvilCircle's prototype constructor from EvilCircle to Shape
EvilCircle.prototype.constructor = EvilCircle;

// Draw method on EvilCircle prototype
EvilCircle.prototype.draw = function () {
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
}

// Check bounds method on EvilCircle prototype
EvilCircle.prototype.checkBounds = function () {
    if ((this.x + this.size) >= width) {
        this.x -= this.size;
    }

    if ((this.x - this.size) <= 0) {
        this.x += this.size;
    }

    if ((this.y + this.size) >= height) {
        this.y -= this.size;
    }

    if ((this.y - this.size) <= 0) {
        this.y += this.size;
    }
}

// Set controls method on EvilCircle prototype
EvilCircle.prototype.setControls = function () {
    // Set reference to this, EvilCircle object instance that invoked function, 
    // because value of this changes in an event handler function to reference 
    // the DOM element on which the handler is registered, the window
    var _this = this;
    window.onkeydown = function (e) {
        if (e.keyCode === 65) { // Key A
            _this.x -= _this.velX;
        } else if (e.keyCode === 68) { // Key D
            _this.x += _this.velX;
        } else if (e.keyCode === 87) { // Key W
            _this.y -= _this.velY;
        } else if (e.keyCode === 83) { // Key S
            _this.y += _this.velY;
        }
    }
}

// Collision detect method on EvilCircle prototype
EvilCircle.prototype.collisionDetect = function () {
    for (var i = 0; i < balls.length; i++) {
        if (balls[i].exists) {
            var dx = this.x - balls[i].x;
            var dy = this.y - balls[i].y;
            var distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.size + balls[i].size) {
                balls[i].exists = false;
                ballCount--;
                para.textContent = 'Ball Count: ' + ballCount;
            }
        }
    }
}

// Array to store Ball objects
var balls = [];

// Create new EvilCircle object instance
var evilCircle = new EvilCircle(
    random(0, width),
    random(0, height),
    true
    );

// Call setControls method on evilCircle object
evilCircle.setControls();

// Function: Animation loop
function loop() {
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(0, 0, width, height);

    while (balls.length < 25) {
        var ball = new Ball(
            random(0, width),
            random(0, height),
            random(-7, 7),
            random(-7, 7),
            true,
            'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')',
            random(10, 20)
            );
        balls.push(ball);
        ballCount++;
        para.textContent = 'Ball Count: ' + ballCount;
    }

    for (var i = 0; i < balls.length; i++) {
        if (balls[i].exists) {
            balls[i].draw();
            balls[i].update();
            balls[i].collisionDetect();
        }
    }

    evilCircle.draw();
    evilCircle.checkBounds();
    evilCircle.collisionDetect();

    requestAnimationFrame(loop);
}
// Call animation loop to get animation started
loop();
