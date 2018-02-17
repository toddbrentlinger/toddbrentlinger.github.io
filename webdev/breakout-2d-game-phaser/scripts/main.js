var game = new Phaser.Game(480, 320, Phaser.AUTO, null, {
    preload: preload, create: create, update: update
});

// Global Variables
var ball,
    paddle,
    // brick variables
    bricks,     // used to create goup of bricks
    newBrick,   // new object added to bricks group on ever iteration of loop
    brickInfo,  // store data for bricks
    // score variables
    scoreText,  // text label that displays current score
    score = 0,  // score, initialized to 0
    brickScore = 10,    // value to increment score when brick is destroyed
    // lives variables
    lives = 3,    // number of lives, initialized to 3
    livesText,    // text label that displays the number of lives that remain
    lifeLostText, // text label that will be shown on screen when the player loses one of their lives
    playing = false,    // bool value representing whether game is currently being played or not 
    startButton;    // button to start game 

function preload() {
    // Scale canvas to fit any screen, keeping aspect ratio untouched
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    // Align canvas element horizontally and vertically, so it is always centered on screen regardless of size
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;

    // Add custom background color to canvas
    game.stage.backgroundColor = "#eee";

    // Load paddle sprite/image
    game.load.image("paddle", "images/paddle.png");

    // Load brick sprite/image
    game.load.image("brick", "images/brick.png");

    // Load ball spritesheet with wobble animation
    game.load.spritesheet("ball", "images/wobble.png", 20, 20);

    // Load button spritesheet
    game.load.spritesheet("button", "images/button.png", 120, 40);
}

function create() {
    // Initialize Arcade Physics engine
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // Disable ball's collision with the bottom edge of the screen
    game.physics.arcade.checkCollision.down = false;

    // Add ball to game and render it on screen
    ball = game.add.sprite(game.world.width * 0.5, game.world.height - 25, "ball");

    // Add animation to ball using animations.add() method
        // Parameters: Name for animation,
        // Array defining order in which to display the frames during animation; 9 frames
        // Framerate in fps; animation at 24fps and there are 9 frames, so animation displays just under three frames per second
    ball.animations.add("wobble", [0, 1, 0, 2, 0, 1, 0, 2, 0], 24);

    // Change anchor point of ball to middle
    ball.anchor.set(0.5);

    // Enable ball for physics system
    game.physics.enable(ball, Phaser.Physics.ARCADE);

    // Treat boundaries of <canvas> element as walls
    ball.body.collideWorldBounds = true;

    // Set ball bounciness
    ball.body.bounce.set(1);

    // Detect if ball falls off screen along bottom edge
    // Make the ball check the world (in this case canvas) bounds and execute the function bound to onOutOfBounds event
    ball.checkWorldBounds = true;
    ball.events.onOutOfBounds.add(ballLeaveScreen, this);

    // Init paddle, add to game and render it on screen
    paddle = game.add.sprite(game.world.width * 0.5, game.world.height - 5, 'paddle');

    // Change anchor point of paddle from top left to middle bottom
    paddle.anchor.set(0.5, 1);

    // Enable physics for the paddle
    game.physics.enable(paddle, Phaser.Physics.ARCADE);

    // Set body of paddle to be immovable
    paddle.body.immovable = true;

    // Call initBricks() function to draw the bricks
    initBricks();

    // Variable for text styling
    var textStyle = { font: "18px Arial", fill: "#0095DD" };
    // Add score text to the game display
    scoreText = game.add.text(5, 5, "Points: 0", textStyle);
    // Add lives text to the game display
    livesText = game.add.text(game.world.width - 5, 5, "Lives: " + lives, textStyle);
    // Change anchor point of livesText to top right
    livesText.anchor.set(1, 0);
    // Add life lost text to game display
    lifeLostText = game.add.text(game.world.width * 0.5, game.world.height * 0.5, "Life lost, click to continue", textStyle);
    // Change anchor point of life lost text to center
    lifeLostText.anchor.set(0.5);
    // Set life lost text visibility to false since it will only be shown when all lives are lost
    lifeLostText.visible = false;

    // Add button to game using add.button() method
    // Parameters:
    // - button's x and y coordinates
    // - name of graphic asset to be displayed for the button
    // - callback function to be executed when button is pressed
    // - reference to this to specify the execution context
    // - frames that will be used for the over, out, and down events
    startButton = game.add.button(game.world.width * 0.5, game.world.height * 0.5, "button", startGame, this, 1, 0, 2);
    // Change anchor point of start button to center
    startButton.anchor.set(0.5);
}

function update() {
    // Enable collision detection between paddle and ball
    game.physics.arcade.collide(ball, paddle, ballHitPaddle);

    // Enable collision detection between ball and bricks group
    game.physics.arcade.collide(ball, bricks, ballHitBrick);

    // Set the paddle position to where the input position is (mouse or touch, depending on platform)
    // Set the default position, if an input position is not yet defined,
    // to be in the middle of the screen
    if (playing) {
        paddle.x = game.input.x || game.world.width * 0.5;
    }
}

// Function: Draw bricks; invoked in create() function
function initBricks() {
    // brickInfo object defined
    brickInfo = {
        width: 50,  // single brick width
        height: 20, // single brick height
        count: {
            row: 7, // number of rows of bricks
            col: 3  // number of columns of bricks
        },
        offset: {   // location on canvas where start to draw bricks
            top: 50,
            left: 60
        },
        padding: 10 // padding between rows/columns of bricks
    };

    // Create group of bricks initialized to empty group
    bricks = game.add.group();

    // Loop through the rows and columns to create new brick on each iteration
    for (c = 0; c < brickInfo.count.col; c++) {
        for (r = 0; r < brickInfo.count.row; r++) {
            // Create new brick and add it to the group
            var brickX = (r * (brickInfo.width + brickInfo.padding)) + brickInfo.offset.left;
            var brickY = (c * (brickInfo.height + brickInfo.padding)) + brickInfo.offset.top;
            // Add brick to game and render it on screen
            newBrick = game.add.sprite(brickX, brickY, "brick");
            // Enable physics for brick
            game.physics.enable(newBrick, Phaser.Physics.ARCADE);
            // Set body of brick to be immovable
            newBrick.body.immovable = true;
            // Change anchor point to center
            newBrick.anchor.set(0.5);
            // Add brick to bricks group
            bricks.add(newBrick);
        }
    }
}

// Function: Executed when collision occurs between ball and bricks group
// Called in collide method in update function
function ballHitBrick(ball, brick) {
    // Play wobble animation on ball
    ball.animations.play("wobble");

    // Variable: New tween that references brick.scale to be changed
    var killTween = game.add.tween(brick.scale);
    // Define state of object at end of tween with to() method
        // Parameters: Object containing chosen parameter's desired ending values (brick scale value)
        // Time of tween in milliseconds
        // Type of easing to use for the tween
    killTween.to({ x: 0, y: 0 }, 200, Phaser.Easing.Linear.None);
    // Optional event handler defining function to be executed when tween finishes
    killTween.onComplete.addOnce(function () {
        // remove brick that collides with ball
        brick.kill();
    }, this);
    // Start tween
    killTween.start();

    // Update score when brick is destroyed
    score += brickScore;
    scoreText.setText("Points: " + score);

    // Check if all bricks are destroyed when max score is reached
    if (score === brickInfo.count.row * brickInfo.count.col * brickScore) {
        // Show winning message, restarting game once alert is dismissed
        alert("You won the game, congratulations!");
        location.reload();
    }
}

// Function: Executed when ball leaves screen past bottom edge of canvas
function ballLeaveScreen() {
    // Decrease lives every time the ball leaves the canvas
    lives--;
    // If lives are NOT zero
    if (lives) {
        // Update lives text to show current number of lives
        livesText.setText("Lives: " + lives);
        // Display life lost text
        lifeLostText.visible = true;
        // Reset ball and paddle position
        ball.reset(game.world.width * 0.5, game.world.height - 25);
        paddle.reset(game.world.width * 0.5, game.world.height - 5);
        // On next input, click or touch, the life lost text will be hidden
        // and the ball will start to move again
        game.input.onDown.addOnce(function () {
            lifeLostText.visible = false;
            ball.body.velocity.set(150, -150);
        }, this);
    } else {
        // Else number of lives is zero, game is over, and game over alert message is shown
        alert("You lost, game over!");
        // When user clicks on resulting alert, the page will be reloaded so they can play again
        location.reload();
    }
}

// Function: Executed when ball collides with paddle
function ballHitPaddle(ball, paddle) {
    // Play wobble animation of ball
    ball.animations.play("wobble");
    // Change ball's x-velocity depending on exact spot it hits the paddle
    ball.body.velocity.x = -1 * 5 * (paddle.x - ball.x);
}

// Function: Start game callback function executed in the add.button() method
function startGame() {
    // When button is pressed, button is removed
    startButton.destroy();
    // Ball's initial velocity is set
    ball.body.velocity.set(150, -150);
    // Playing variable set to true
    playing = true;
}