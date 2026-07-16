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
var score=0;


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
		question: "Question?",
		options: ["Answer", "Option", "Option", "Option"],
		answer: "Answer"
	},
	
	{
		question: "Question?",
		options: ["Answer", "Option", "Option", "Option"],
		answer: "Answer"
	},
	
	{
		question: "Question?",
		options: ["Answer", "Option", "Option", "Option"],
		answer: "Answer"
	},
	
	{
		question: "Question?",
		options: ["Answer", "Option", "Option", "Option"],
		answer: "Answer"
	},
	
	{
		question: "Question?",
		options: ["Answer", "Option", "Option", "Option"],
		answer: "Answer"
	},
	
	{
		question: "Question?",
		options: ["Answer", "Option", "Option", "Option"],
		answer: "Answer"
	},
	
	{
		question: "Question?",
		options: ["Answer", "Option", "Option", "Option"],
		answer: "Answer"
	},
];

// Randomizes the order of the questions using the Fisher-Yates shuffle algorithm
function shuffleQuestions(array)
{
	for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Loads the quiz questions with the options provided
function loadQuiz()
{
	// Randomize the questions array upon loading of the page
    shuffleQuestions(quizData);
	
	quizBox.innerHTML = ""; // Clear existing content
	
	quizData.forEach((q, qIndex) => {
        // Randomize the options for the current question
        const shuffledOptions = shuffleQuestions([...q.options]);

        // Create HTML structure for the question block
        let optionsHtml = shuffledOptions.map(opt => `
			<label>
				<input type="radio" name="q${qIndex}" value="${opt}">
				${opt}
			</label>
        `).join("");

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
	score=0; //reset score to 0, check ans and give score if correct
	
	quizData.forEach((q, qIndex) => {
        const selectedOption = document.querySelector(`input[name="q${qIndex}"]:checked`);
        const block = document.querySelectorAll('.question-block')[qIndex];
		
		if (selectedOption) {
            if (selectedOption.value === q.answer)
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