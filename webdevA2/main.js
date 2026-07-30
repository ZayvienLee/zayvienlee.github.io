/*jshint esversion: 6 */

// Target all elements to save to constants

// This is for the main navigation buttons
const page1btn = document.querySelector("#page1btn");
const page2btn = document.querySelector("#page2btn");
const page3btn = document.querySelector("#page3btn");
const page4btn = document.querySelector("#page4btn");

var allpages = document.querySelectorAll(".page");

/*JS for hamMenu */
const hamBtn = document.querySelector("#hamIcon");
const menuItemsList = document.querySelector("nav ul");
hamBtn.addEventListener("click", toggleMenus);


// This is the required code for the quiz
const btnSubmit=document.querySelector("#btnSubmit"); 
btnSubmit.addEventListener("click",CheckAns);
const scorebox=document.querySelector("#scorebox");
const quizBox = document.getElementById("quiz-box");
var score = 0;

// Code to toggle the fullscreen on Desktop
const btnFS=document.querySelector("#btnFS");
const btnWS=document.querySelector("#btnWS");
btnFS.addEventListener("click", enterFullscreen);
btnWS.addEventListener("click", exitFullscreen);

// The following code below to allow compatibility for all browsers on the webpage
function enterFullscreen() { //must be called by user generated event
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  } else if (document.documentElement.mozRequestFullScreen) { // Firefox
    document.documentElement.mozRequestFullScreen();
  } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari, and Opera
    document.documentElement.webkitRequestFullscreen();
  } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
    document.documentElement.msRequestFullscreen();
  }
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) { // Firefox
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) { // Chrome, Safari, and Opera
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { // IE/Edge
    document.msExitFullscreen();
  }
}

// The code to toggle the menu
function toggleMenus()
{ 
	/*open and close menu*/
	//if menuItemsList dont have the class "menuShow", add it, else remove it
	menuItemsList.classList.toggle("menuShow"); 
}

function hideall(){ // function to hide all pages
	for (let onepage of allpages) { // go through all subtopic pages
		onepage.style.display = "none"; // hide it
	}
}

function show (pgno){ // function to show selected page Node
	hideall();
	// select the page based on the parameter passed in
	let onepage = document.querySelector("#page"+pgno);
	onepage.style.display = "block"; // Show the page.
}

/*Listen for clicks on the buttons, assign anonymous
eventhandler functions to call show functions*/
page1btn.addEventListener("click", function () {
	show(1);
});
page2btn.addEventListener("click", function () {
	show(2);
});
page3btn.addEventListener("click", function () {
	show(3);
});
page4btn.addEventListener("click", function () {
	show(4);
});
hideall();

show(1); // For this case, the main page will be shown by default

// This is needed to set the questions for the quiz
const quizData =
[
	{
		question: "What is the highest score possible in Bowling? (Perfect Game)?",
		options: ["300", "200", "400", "100"],
		answer: "300"
	},
	
	{
		question: "What do you call three strikes in a row?",
		options: ["Turkey", "Chicken", "Snake", "Dinosaur"],
		answer: "Turkey"
	},
	
	{
		question: "What is the heaviest a bowling ball can be allowed?",
		options: ["16 Pounds", "1 Pound", "20 Pounds", "10 Pounds"],
		answer: "16 Pounds"
	},
	
	{
		question: "What is the ideal weight of a bowling ball for an individual? (of the Body's Weight)",
		options: ["10%", "5%", "20%", "50%"],
		answer: "10%"
	},
	
	{
		question: "What is the name for knocking down any remaining pins int the SECOND throw?",
		options: ["Spare", "Strike", "Good Try", "Save"],
		answer: "Spare"
	},
	
	{
		question: "How do you call it when you save your game when you knock down the remaining pins which are apart (split)?",
		options: ["Split Conversion", "Curve Save", "Damage Undone", "Flying Pins"],
		answer: "Split Conversion"
	},
	
	{
		question: "What do you call a full ten pin drop (knocking all pins down in one throw)?",
		options: ["Strike", "Goal", "YAY!", "HI-5"],
		answer: "Strike"
	},
];

// Randomizes the order of the array using the Fisher-Yates shuffle algorithm. Used by the Question Data for the Quiz and Pins for the Bowling Game
function shuffleArray(array)
{
	for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // This correctly includes the current element i in the pool of potential swap choices
        [array[i], array[j]] = [array[j], array[i]]; // This swaps the elements directly using the destructing assighment syntax
    }
    return array;
}

// Loads the quiz questions with the options provided
function loadQuiz()
{
	// Randomize the questions array upon loading of the page
    shuffleArray(quizData);
	
	quizBox.innerHTML = ""; // Clear existing content
	
	quizData.forEach(function(q, qIndex) 
	{
        // Randomize the options for the current question
		// A shallow copy is created, with the spread operator
        const shuffledOptions = shuffleArray([...q.options]);

        // Create HTML structure for the question block
        let optionsHtml = shuffledOptions.map(
			function(opt) {
				return `<label><input type="radio" name="q${qIndex}" value="${opt}">${opt}</label>`;
			}).join("");

		// Adds the content to the quiz
        quizBox.innerHTML += `
			<fieldset class="question-block">
				<legend>${qIndex + 1}. ${q.question}</legend>
				${optionsHtml}
			</fieldset>
        `;
	});
}

// Used to check the answers to the quiz
function CheckAns(){  
	score = 0; //reset score to 0, check ans and give score if correct
	
	// For every question, check if the answer is correct
	quizData.forEach(function(q, qIndex) 
	{
        const selectedOption = document.querySelector(`input[name="q${qIndex}"]:checked`); // Gets the chosen answer based on the chosen radio button
        const block = document.querySelectorAll('.question-block')[qIndex]; // Selects the corresponding element that holds that specific question
		
		// This resets the style first to avoid overlapping behaviour
		block.style.backgroundColor = "";
		
		// Before checking the answer, check if the option on the question is unanswered
		if (selectedOption) {
            if (selectedOption.value === q.answer) // Checks if the option selected is the answer
			{
                score++;
                block.style.backgroundColor = "#228770"; // Correct answers will be marked in darker shade of green
            } 
			else
			{
                block.style.backgroundColor = "#911f19"; // Incorrect answers will be marked in a darker shade of red
            }
        }
		else
		{
			block.style.backgroundColor = "#824c00"; // Unanswered questions are marked in a darker shade of orange
		}
    });
	
	scorebox.innerHTML="Score:"+score;
}

// Initialize the quiz on load of the webpage
loadQuiz();


// Delcares and assigns the variables for the ball image rotation
const spinElement = document.getElementById("RollingBowlingBall");
let currentRotation = 0;
let lastTime = 0;
let rotationSpeed = 0.6; // Default rotation speed


function animationBall (currentTime) {
	// Initialize lastTime on the very first frame
	if (!lastTime) lastTime = currentTime;
	
	// Calculate exact time elapsed since the last frame
	const deltaTime = currentTime - lastTime;
	lastTime = currentTime;
	
	// Incrementation of rotation based on actual elapsed time
	currentRotation += rotationSpeed * deltaTime;
	
	// This to keep the rotation values between the boundaries of 0 and 360 degrees
	currentRotation %= 360;
	
	// Rotate the element
	spinElement.style.transform = `rotate(${currentRotation}deg)`;
	
	// Request the next frame recursively
	requestAnimationFrame(animationBall);
}

requestAnimationFrame(animationBall); // Begin the rotation loop

// The elements for the slider to adjust the RPM
const sliderRPM = document.querySelector("#RPMSlider");
const outputRPM = document.querySelector("#outputRPM");

// The function to update when the slider of the RPM is adjusted
function UpdateRPMSlider() {
	var textLine;
	
	if (event.target.value < 200)
	{
		textLine = "Straight / Stroker / Spinner";
	}
	else if (event.target.value < 250)
	{
		textLine = "Stroker / Spinner";
	}
	else if (event.target.value < 300)
	{
		textLine = "Stroker / Spinner / Tweener";
	}
	else if (event.target.value < 350)
	{
		textLine = "Tweener";
	}
	else if (event.target.value < 370)
	{
		textLine = "Tweener / Cranker";
	}
	else if (event.target.value < 400)
	{
		textLine = "Cranker";
	}
	else
	{
		textLine = "Cranker / Two-Handed";
	}
	
	rotationSpeed = event.target.value * (360 / 60000); // Set the rotationSpeed as the degress of turn per millisecond.
	
	outputRPM.textContent = `Revolutions Per Minute: ${event.target.value}; Throw Type: ${textLine}`;
}

sliderRPM.addEventListener('input', UpdateRPMSlider);



// Below is the required code for the mini game
let gameLastTime = 0;
let gameAnimateID = null; // Set the animate id to null first
let game_deltaTime = 0;
let gameScore = 0; // Score the player achieves
let streak = 0; // Increases the score for accuracy

// Define the audio sound effects below
// Link to the Sound Effects:
// https://pixabay.com/sound-effects/search/bowling/
// https://pixabay.com/sound-effects/search/fail/
// https://pixabay.com/sound-effects/search/game%20end/
// https://pixabay.com/sound-effects/search/applause/

const missSound = new Audio('audio/BallMiss.mp3');
const ballReleaseSound = new Audio('audio/BowlingBallRelease.mp3');
const pinHitFewSound = new Audio('audio/FewPinHit.mp3');
const singlePinHitSound = new Audio('audio/SinglePinHit.mp3');
const gameEndSound = new Audio('audio/GameEnd.mp3');
const hardStrikeSound = new Audio('audio/HardStrike.mp3');
const softStrikeSound = new Audio('audio/SoftStrike.mp3');
const applauseAudio = new Audio('audio/Applause.mp3');

// Needed to move the ball's position
let ballCenterX = 0;
let ballCenterY = 570;
let ballRotation = 0; // Ball's Rotation

// The ball's direction & elapsedTime
let sineValue = 0;
let elapsedTime = 0;
var intervalDirection; // Used to start or stop the the oscillation of the direction

let collided = false; // To check if the pins have collided with the trigger area

const sliderDisplay = document.getElementById("sliderAngle"); // Display the angle where the ball will travel with a slider
const scoreBoard = document.getElementById("score");

// Define the collision between the elements
const bowlingGameArea = document.getElementById("gamearea");
const pinTriggerZone = document.getElementById("triggerzone");
const Bowlingball = document.getElementById("gameball");
const BowlingPins = document.getElementsByClassName("bowlingpin");

// The buttons are defined here
const bowlBallButton = document.getElementById("bowlBall");
const resetGameButton = document.getElementById("resetGame");

// Get the bounding areas of the required elements
var ballBounds = Bowlingball.getBoundingClientRect();
var triggerZone = pinTriggerZone.getBoundingClientRect();
var gameAreaBounds = bowlingGameArea.getBoundingClientRect();

// To calculate the average values of the game
var accuracytotal = 0;
var accuracyAverage = 0;
var scoreAverage = 0;

var attempts = 12; // Each game has 12 attempts

function gameUpdate(gameCurrentTime) {
	if (!gameLastTime) gameLastTime = gameCurrentTime;
	
	// Get the deltatime
	game_deltaTime = (gameCurrentTime - gameLastTime) / 1000;
	gameLastTime = gameCurrentTime;
	
	ballCenterY -= 4; // The y value remains fixed
	ballCenterX += sineValue; // The x value moves according to the direction stated by the sine value
	
	ballRotation += 30; // Set the ballRotation per frame.
	ballRotation %= 360;
	
	Bowlingball.style.transform = `rotate(${ballRotation}deg)`; // Set the moving ball's rotation
	
	// Change the ball's position
	Bowlingball.style.left = `${ballCenterX}px`;
	Bowlingball.style.top = `${ballCenterY}px`;
	
	// The intended logic for the game (delete this line later)
	
	ballBounds = Bowlingball.getBoundingClientRect();
	triggerZone = pinTriggerZone.getBoundingClientRect();
	gameAreaBounds = bowlingGameArea.getBoundingClientRect();
	
	if (hasCollidedWithTrigger(ballBounds, triggerZone) && !collided)
	{
		collided = true;
		checkAccuracy(sineValue);
		scoreBoard.innerHTML += `<br>Score: ${gameScore}<br>Attempts Left: ${attempts}`;
	}
	
	if (isOutsideAreaBoundary(ballBounds, gameAreaBounds))
	{
		// Stops the game loop
		stopGameLoop();
		
		// The ball missed the pins!
		if (!collided)
		{
			scoreBoard.innerHTML = `Missed! Try Again...<br>Score: ${gameScore}<br>Attempts Left: ${attempts}`;
			missSound.play(); // A miss, the miss sound is played
		}
	}
	else
	{
		// Loop and update the game ID
		gameAnimateID = requestAnimationFrame(gameUpdate);
	}
}

// To launch the ball
function launchBall() {
	clearInterval(intervalDirection);
	intervalDirection = null;
	
	bowlBallButton.disabled = true;
	resetGameButton.disabled = true;
	gameAnimateID = requestAnimationFrame(gameUpdate);
	
	ballReleaseSound.play(); // The ball is released
}

// This is to stop the animation loop
function stopGameLoop() {
	if (gameAnimateID) {
		cancelAnimationFrame(gameAnimateID);
		gameAnimateID = null;
		
		Bowlingball.style.opacity = "0";
		
		// Decrement the number by 1
		attempts--;
		
		setTimeout(nextRound, 1500);
	}
}

function nextRound() {
	
	resetBall();
	resetPins();
	
	// Check if there are still attempts remaining
	if (attempts > 0)
	{
		bowlBallButton.disabled = false;
		if (intervalDirection == null) intervalDirection = setInterval(changeDirection, 30);
		
		scoreBoard.innerHTML = `Score: ${gameScore}<br>Attempts Left: ${attempts}`;
	}
	else
	{
		gameEndSound.play(); // The game is over.
		
		if (gameScore >= 200)
		{
			applauseAudio.play(); // Congratuate the player for the game for a well played game
		}
		
		accuracyAverage = Math.round((accuracytotal / 12) * 100) / 100; // To display the average accuracy for each frame to 2 d.p.
		scoreAverage = Math.round((gameScore / 12)* 100) / 100; // Display the average score for each frame to 2 d.p.
		
		scoreBoard.innerHTML = 
		`Gameover!<br>
		Final Score: ${gameScore}<br>
		Attempts Left: ${attempts}<br>
		Average Accuracy per Frame: ${accuracyAverage}%<br>
		Average Score per Frame: ${scoreAverage}`;
	}
	
	resetGameButton.disabled = false;
}

// This detects if the ball has collided with the intended collision element
function hasCollidedWithTrigger(ball, trigger) {
	
	// Checks if the trigger and ball intersect each other
	return !(
		ball.right < trigger.left ||
		ball.left > trigger.right ||
		ball.bottom < trigger.top ||
		ball.top > trigger.bottom
	);
}

// Since the ball is inside the element, check if the ball leaves the element.
function isOutsideAreaBoundary(ball, gameArea) {
	
	// This checks if the ball is partially outside the game area box
	return !(
		ball.top > gameArea.top &&
		ball.left > gameArea.left &&
		ball.bottom < gameArea.bottom &&
		ball.right < gameArea.right
	);
}

function resetBall() {
	// Reset the collision status to flase
	collided = false;
	
	// Set the ball back to the start
	ballCenterX = 0;
	ballCenterY = 570;
	
	ballRotation = 0; // Reset the ball's rotation to 0
	Bowlingball.style.transform = `rotate(${ballRotation}deg)`;
	
	Bowlingball.style.left = `${ballCenterX}px`;
	Bowlingball.style.top = `${ballCenterY}px`;
	
	Bowlingball.style.opacity = "1.0";
}

function resetPins() {
	// Return the pins back to the game area
	for (const pin of BowlingPins) {
		pin.classList.remove("knockPins");
		pin.style.opacity = "1.0";
	}
}

// Check accuracy of the shot. The closer to 0, the more accurate the shot.
function checkAccuracy(sineValue) {
	const accuracy = Math.abs(sineValue);
	
	if (accuracy < 0.15) {
		removeAllPins();
		scoreBoard.innerHTML = "Strike!";
		hardStrikeSound.play(); // All the pins are hit!
		applauseAudio.play(); // Congrats sound effect
	}
	else if (accuracy >= 0.15 && accuracy < 0.3) {
		choosePins(8, 9);
		scoreBoard.innerHTML = "Good Hit!";
		hardStrikeSound.play(); // Almost all of the pins are hit
	}
	else if (accuracy >= 0.3 && accuracy < 0.45) {
		choosePins(5, 7);
		scoreBoard.innerHTML = "Getting There!";
		softStrikeSound.play(); // About half the pins are hit
	}
	else if (accuracy >= 0.45 && accuracy < 0.6) {
		choosePins(3, 4);
		scoreBoard.innerHTML = "More Potential Here!";
		pinHitFewSound.play(); // Only a few pins are hit
	}
	else {
		choosePins(1, 2);
		scoreBoard.innerHTML = "Weak Hit. But Nice Try.";
		singlePinHitSound.play(); // Minimal pins hit
	}
	
	accuracytotal += (1 - accuracy) * 100;
}

// To reset the game
function resetGame() {
	
	// Reset the values back to the default.
	attempts = 12;
	
	gameScore = 0;
	streak = 0;
	
	accuracytotal = 0;
	accuracyAverage = 0;

	nextRound();
}

// This function to determine the balls direction before throwing
function changeDirection() {
	elapsedTime += 0.15;
	sineValue = Math.sin(elapsedTime);
	sliderDisplay.value = sineValue * 100;
}


// This decides, from the pins, how many should be taken and what pins to remove
function choosePins(min, max) {
	
	// This is needed to randomise the pins that fall
	const count = Math.floor(Math.random() * (max - min + 1)) + min;
	const shuffledPins = shuffleArray([...BowlingPins]); // Shuffle the pins with the defined function above
	
	const chosenPins = shuffledPins.slice(0, count);
	
	// This is to 'knock down' the pins with animation and opacity changes
	for (const pin of chosenPins) {
		pin.classList.add("knockPins");
		pin.style.opacity = "0";
	}
	
	// Increment the game's score.
	gameScore += count + (count * Math.round(streak / 2)); // Streak lost. Penalty.
	
	if (streak > 0) streak -= 1; // Lose 1 streak
}

// Should all pins be knocked down, remove all of them
function removeAllPins() {
	for (const pin of BowlingPins) {
		pin.classList.add("knockPins");
		pin.style.opacity = "0";
	}
	
	gameScore += 10 + (10 * Math.round(streak / 2)); // All 10 pins are knocked down.
	streak += 1; // Streak increased by 1
}

// Initalise the game first
resetGame();

// Buttons to interact for the game
bowlBallButton.addEventListener('click', launchBall);
resetGameButton.addEventListener('click', resetGame);