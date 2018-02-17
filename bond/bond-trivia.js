// Variables: references to elements in document
var questionPara = document.getElementById('bond-trivia-question'),
    choicesDiv = document.getElementById('bond-trivia-choices'),
    responsePara = document.getElementById('bond-trivia-response'),
    scoreHeading = document.getElementById('bond-trivia-score'),
    submitBtn = document.getElementById('bond-trivia-submit');

// Trivia Constructor Function: base class for single Bond trivia object containing question, answer,
// and array of wrong answers
function Trivia(question, answer, wrongChoices) {
    this.question = question;
    this.answer = answer;
    this.wrongChoices = wrongChoices;
}

// array of trivia objects
// new Trivia(questionString, answerString, wrongChoicesArray)
var bondTriviaOptions = [
    new Trivia('Who was the first actor to play James Bond in a theatrical film?', 'Sean Connery', ['Roger Moore', 'George Lazenby', 'Barry Nelson']),
    new Trivia('Who was the second actor to play James Bond in a theatrical film?', 'George Lazenby', ['Roger Moore', 'Sean Connery', 'Barry Nelson']),
    new Trivia('The James Bond movies are based on a series of novels by what British author?', 'Ian Fleming', ['Ian Gold', 'Peter Finch', 'Peter James']),
    new Trivia('What was the first James Bond movie?', 'Dr. No', ['Casino Royale', 'On Her Majesty\'s Secret Service', 'For Your Eyes Only']),
    new Trivia('What actor made his first appearance as James Bond in GoldenEye?', 'Pierce Brosnan', ['Timoty Dalton', 'Roger Moore', 'Daniel Craig']),
    new Trivia('What James Bond film features Christopher Walken as billionaire industrialist Max Zorin?', 'A View To A Kill', ['For Your Eyes Only', 'Octopusy', 'License To Kill']),
    new Trivia('What was the original title of License to Kill?', 'License Revoked', ['License For Murder', 'License Suspended', 'License Extended']),
    new Trivia('What was the first Bond film NOT based on a book?', 'The Spy Who Loved Me', ['The Living Daylights', 'The Man With The Golden Gun', 'Tomorrow Never Dies']),
    new Trivia('What secret service agency does James Bond work for?', 'MI6', ['MI5', 'MI7', 'MI8']),
    new Trivia('Who was the first actor to play "M"?', 'Bernard Lee', ['Robert Brown', 'Jack Lord', 'Judi Dench']),
    new Trivia('How is Major Boothroyd better known?', 'Q', ['R', 'S', 'M']),
    new Trivia('Which Bond film is set primarily in Japan', 'You Only Live Twice', ['Octopussy', 'Die Another Day', 'The Living Daylights']),
    new Trivia('SPECTRE stands for SPecial Executive for Counter-intelligence, Revenge, and...what?', 'Extortion', ['Extinction', 'Examination', 'Exemption']),
    new Trivia('Which film featured London\'s Millenium Dome?', 'The World Is Not Enough', ['Quantum of Solace', 'A View To A Kill', 'Tomorrow Never Dies']),
    new Trivia('What is the codename of Goldfinger\'s plan to rob Fort Knox?', 'Operation Grand Slam', ['Hold The Fort', 'Gold Run', 'Knox Galore']),
    new Trivia('Name the first film in which Sheriff J.W. Pepper appears.', 'Live and Let Die', ['Moonraker', 'The Man With The Golden Gun', 'The Spy Who Loved Me']),
    new Trivia('What was the first film in which James Bond skis?', 'On Her Majesty\'s Secret Service', ['A View To A Kill', 'From Russia With Love', 'You Only Live Twice']),
    new Trivia('Who sang the title theme for Diamonds Are Forever?', 'Shirley Bassey', ['Rita Coolidge', 'A-Ha', 'Tina Turner']),
    new Trivia('What famous landmark does Grace Jones jump from in A View To A Kill?', 'The Eiffel Tower', ['Big Ben', 'The Empire State Building', 'Leaning Tower of Pisa']),
    new Trivia('What was Alec Trevelyan\'s (Sean Bean) "00" number in GoldenEye?', '006', ['003', '009', '008']),
    new Trivia('Which filmmaker directed both GoldenEye and Casino Royale?', 'Martin Campbell', ['Terence Young', 'Lewis Gilbert']),
    new Trivia('Which villain had a manservant called Nick Nack?', 'Francisco Scaramanga', ['Elektra King', 'Rosa Klebb']),
    new Trivia('How many times did Timothy Dalton play James Bond?', 'Twice', ['Once', 'Three Times', 'None']),
    new Trivia('Which film opens with Bond attending a funeral and attacking the grieving widow?', 'Thunderball', ['Diamonds Are Forever', 'Dr. No', 'Goldfinger']),
    new Trivia('Which film features Brooklyn-born magician and card shark Ricky Jay?', 'Tomorrow Never Dies', ['You Only Live Twice', 'Live and Let Die']),
    new Trivia('What is the name of Kara Milovy\'s cello in The Living Daylights?', 'The Lady Rose', ['Sound of Angels', 'Guns N\' Roses']),
    new Trivia('What is the name of the assassin who disguises himself as a milkman, a jogger, and a balloon seller?', 'Necros', ['Mr Solo', 'Stamper']),
    new Trivia('What is Roger Moore dressed as when he diffuses the bomb in Octopussy\'s final scene?', 'A clown', ['A bomb diffusal officer', 'A policeman', 'A soldier']),
    new Trivia('What is the nickname given to the autogyro that Bond flies in You Only Live Twice?', 'Little Nellie', ['Big Bird One', 'Tiger Tanaka', 'Sproose Goose']),
    new Trivia('What make of pistol did James Bond prefer before M forced him to use his signature Walther in Dr. No?', 'Beretta', ['Ruger', 'Glock', 'Smith and Wesson']),
    new Trivia('Which actor/actress did NOT appear as two different characters in the Bond series?', 'David Hedison', ['Maud Adams', 'Joe Don Baker', 'Charles Gray'])
];
// NOTE: use arguments property of function to get any number of remaining arguments as wrong choices

// TriviaGame Constructor
var triviaGame = {

    // variables for current game with initial/default values
    score: 0,

    // Set game object properties
    setProperties: function () {
        this.triviaOptions = Array.from(bondTriviaOptions);
        this.currentTriviaObj = this.setRandomTrivia();
        this.currentQuestion = this.currentTriviaObj.question;
        this.currentAnswer = this.currentTriviaObj.answer;
        this.currentChoices = this.randomizeChoices();
    },

    // Function: return random trivia object from triviaOptions array and remove trivia object from array
    setRandomTrivia: function () {
        // Splice method on triviaOptions to return random array element after removing it from triviaOptions
        return this.triviaOptions.splice(Math.floor(Math.random() * this.triviaOptions.length), 1)[0];
    },

    // Function: randomly sort all choices together, return new array
    randomizeChoices: function () {
        // add correct answer to wrong choices array in new variable
        var arr = this.currentTriviaObj.wrongChoices.concat(this.currentTriviaObj.answer);

        // Return shuffled array (Fisher-Yates algorithm; css-tricks.com)
        for (var j, x, i = arr.length;
                i;
                j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
        return arr;
    },

    // Function: set up game
    setUpGame: function () {
        // add onclick event handlers to choices paragraph elements
        var arrChoices = document.querySelectorAll('#bond-trivia-choices > p');
        for (var i = 0; i < arrChoices.length; i++) {
            // Onclick Event Handler: add .selected class to choice user clicks on
            arrChoices[i].onclick = function (event) {
                // remove .selected class from each choice
                var arrChoices = document.querySelectorAll('#bond-trivia-choices > p');
                for (var i = 0; i < arrChoices.length; i++) {
                    if (arrChoices[i].classList.contains('selected-answer')) {
                        arrChoices[i].classList.remove('selected-answer');
                    }
                }
                // add .selected class to choice clicked on by user in which this function is invoked
                event.target.classList.add('selected-answer');
            };
        }

        // add onclick event Handler to submit button to test trivia question
        submitBtn.onclick = function () {
            triviaGame.testTriviaAnswer();
        };
    },

    // Function: display trivia object
    displayTrivia: function () {
        // display question
        questionPara.textContent = this.currentQuestion;

        // display randomly sorted choices with answer positioned randomly amongst choices
        for (var i = 0; i < this.currentChoices.length; i++) {
            choicesDiv.appendChild(document.createElement('p')).textContent = this.currentChoices[i];
        }

        // set up game
        this.setUpGame();

        // display score
        scoreHeading.textContent = 'Score: ' + this.score;
    },

    // Function: test submitted trivia answer
    testTriviaAnswer: function () {

        // get selected choice
        var selectedChoice = choicesDiv.querySelector('.selected-answer');

        // if selected choice is equal to right answer, increment score and display message, add border to right answer
        if (selectedChoice.textContent === this.currentAnswer) {
            this.score += 5;
            scoreHeading.textContent = 'Score: ' + this.score;
            responsePara.textContent = 'Correct! +5 points';
        } else {
            this.score -= 5;
            responsePara.textContent = 'Wrong -5 points';
            scoreHeading.textContent = 'Score: ' + this.score;
        }

        // reset trivia option
        // get new random trivia
        // if triviaOptions contains only one trivia object, reset score and all trivia options
        if (this.triviaOptions.length === 0) {
            responsePara.textContent += ' --- Final Score: ' + this.score + ' points!';
            this.score = 0;
            this.triviaOptions = Array.from(bondTriviaOptions);
        }
        this.currentTriviaObj = this.setRandomTrivia();
        this.currentQuestion = this.currentTriviaObj.question;
        this.currentAnswer = this.currentTriviaObj.answer;
        this.currentChoices = this.randomizeChoices();
        // remove elements from previous trivia
        var arrChoices = document.querySelectorAll('#bond-trivia-choices > p');
        for (var i = 0; i < arrChoices.length; i++) {
            arrChoices[i].remove();
        }
        // display new trivia
        this.displayTrivia();
    },

    playGame: function () {

        this.setProperties();

        this.displayTrivia();
    }
}

// Play Trivia Game
triviaGame.playGame();