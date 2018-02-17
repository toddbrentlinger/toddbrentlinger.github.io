// Store reference to canvas element
var canvas = document.getElementById("myCanvas");

// Store 2D rendering context of canvas
var ctx = canvas.getContext("2d");

// Variables: define position of ball
var x = canvas.width / 2;
var y = canvas.height - 30;

// Variables: speed, or distance per update draw loop, of ball
var dx = 2;
var dy = -2;

// Variables: ball max speed and value to increment vertical speed of ball when it collides with paddle
var maxBallSpeed = 5,
    vertSpeedChange = 0.2;

// Variable: ball radius
var ballRadius = 10;

// Variable: ball color
var ballColor = "#0095DD";

// Variables: value to change horizontal speed of ball when it collides with paddle
// and 

// Variables: paddle width, height, intitial position
var paddleWidth = 75, // 75
    paddleHeight = 10,
    paddleX = (canvas.width - paddleWidth) / 2;

// Variables: pressed right/left buttons booleans
var rightPressed = leftPressed = false;

// Variables: brick properties
var brickRowCount = 3,
    brickColumnCount = 5,
    brickWidth = 75,
    brickHeight = 20,
    brickPadding = 10,
    brickOffsetTop = 30,
    brickOffsetLeft = 30;

// Variables: score and points per brick
var score = 0,
    pointsPerBrick = 5;

// Variable: player lives
var lives = 3;

// Variable: bricks array of objects containing coordinates of each brick
var bricks = [];
for (var c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (var r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

// Function: random number generator
function random(min, max) {
    var num = Math.floor(Math.random() * (max - min)) + min;
    return num;
}

// Add two event listeners for key presses
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// Event handler: key down
function keyDownHandler(e) {
    if (e.key == "Right") { // ArrowRight
        rightPressed = true;
    } else if (e.key == "Left") { // ArrowLeft
        leftPressed = true;
    }
}

// Event handler: key up
function keyUpHandler(e) {
    if (e.key == "Right") {
        rightPressed = false;
    } else if (e.key == "Left") {
        leftPressed = false;
    }
}

// Add event listener for mouse movement
document.addEventListener("mousemove", mouseMoveHandler, false);

// Event handler: mouse move
function mouseMoveHandler(e) {
    // Distance from canvas left edge to cursor horizontal position
    var relativeX = e.clientX - canvas.offsetLeft;
    // If relativeX is less than half paddle width from canvas left edge
    if (relativeX < paddleWidth / 2) {
        paddleX = 0;
    } else if (relativeX > canvas.width - paddleWidth / 2) {
        // Else if relativeX is more than half paddle width from right edge
        paddleX = canvas.width - paddleWidth;
    } else {
        // Else cursor is within half paddle width from each edge of canvas
        paddleX = relativeX - paddleWidth / 2;
    }
}

// Function: collision detection
function collisionDetection() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.status == 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score += pointsPerBrick;
                    ballColor = "rgb(" + random(0, 255) + "," + random(0, 255) + "," + random(0, 255) + ")";
                    if ( score == pointsPerBrick * (brickRowCount * brickColumnCount) ) {
                        alert("YOU WIN, CONGRATULATIONS! Final Points: " + score);
                        document.location.reload();
                    }
                }
            }
        }
    }
}

// Function: draw score
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    if (Math.abs(dy) < maxBallSpeed) {
        ctx.fillText("Score: " + score + "   Speed: " + Math.abs(dy).toFixed(1), 8, 20);
    } else {
        // Else ball speed is greater than or equal to maxBallSpeed, display string Max for speed
        ctx.fillText("Score: " + score + "   Speed: MAX", 8, 20);
    }
    
}

// Function: draw player lives
function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}

// Function: draw ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = ballColor;
    ctx.fill();
    ctx.closePath();
}

// Function: draw paddle
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

// Function: draw bricks
function drawBricks() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                // Find start coordinates of each brick
                var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                // Draw brick
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

// Function: main drawing function to run repeatedly
function draw() {
    // Clear canvas before each frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw bricks
    drawBricks();

    // Draw ball
    drawBall();

    // Draw paddle
    drawPaddle();

    // Draw score
    drawScore();

    // Draw player lives
    drawLives();

    // Collision detection
    collisionDetection();

    // Collision detect edges of screen
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
        ballColor = "rgb(" + random(0, 255) + "," + random(0, 255) + "," + random(0, 255) + ")";

    }
    if (y + dy < ballRadius) {
        dy = -dy;
        ballColor = "rgb(" + random(0, 255) + "," + random(0, 255) + "," + random(0, 255) + ")";
    } else if (y + dy > canvas.height - ballRadius) {
        // Else if ball is lower than bottom edge of canvas
        if (x > paddleX && x < paddleX + paddleWidth) {
            // If ball is within left/right side of paddle and lower than bottom edge of canvas
            // Reverse dy, y-axis speed, and increase it by vertSpeedChange keeping it less than or equal to maxBallSpeed
            dy = -Math.sign(dy) * (Math.abs(dy) == maxBallSpeed ? maxBallSpeed : Math.min(Math.abs(dy) + vertSpeedChange, maxBallSpeed));
            // Change dx, x-axis speed depending on direction of paddle movement

        } else {
            // Else ball is lower than bottom edge of canvas and NOT within paddle sides
            lives--;
            if (!lives) {
                // Game Over
                alert("GAME OVER");
                // reload page
                document.location.reload();
            } else {
                x = canvas.width / 2;
                y = canvas.height - 30;
                dx = 2;
                dy = -2;
                paddleX = (canvas.width - paddleWidth) / 2;
            }    
        }
        
    }

    // Check if left/right cursor keys are pressed
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    // Change ball position for next draw loop
    x += dx;
    y += dy;

    // Repeatedly call draw() function
    requestAnimationFrame(draw);
}

// Call draw() function for first time
draw();