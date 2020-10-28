//All Global Variables getting element from HTML
var main = document.querySelector("main")
var startBtn = document.getElementById('startBtn')
var submitBtn = document.getElementById('submitBtn');
var minutesDisplay = document.querySelector("#minutes");
var secondsDisplay = document.querySelector("#seconds");
var quizBox= document.querySelector('.quizbox')
var resultsBox = document.querySelector(".resultsbox")
var scoreForm= document.querySelector("#scoreform")
var quizQuestion = document.querySelector("#quizquestion")
var choice1 = document.querySelector("#btn1")
var choice2 = document.querySelector("#btn2")
var choice3 = document.querySelector("#btn3")
var choice4 = document.querySelector("#btn4")
var i = 0
var score = 0
//Timer Variables
var totalSeconds = 180;
var timeElapsed = 0;
var interval;

//Array of questions, choices and answers
    var questionArr=[
        {
          question: "Who plays Michael Scott in The Office?",
          choices: [" Bob Odenkirk ", " Bryan Cranston ", " Steve Carrell ", " Jason Segel "],
          correctAnswer: "btn3"
      }, {
          question: "What food does Jim put Dwight's stapler in?",
          choices: [" Jello ", " Tomato Soup ", " Pudding ", " Burrito "],
          correctAnswer: "btn1"
      },{
          question: "Who started the fire?",
          choices: [" Pam ", " Ryan ", " Stanley ", " Toby "],
          correctAnswer: "btn2"
      }, {
          question: "In the episde 'The Injury', what is Michael's injury?",
          choices: [" Broken collarbone ", " Grilled foot ", " Black eye "," Twisted ankle "],
          correctAnswer: "btn2"
      }, {
          question: "Where is Dunder Mifflin located?",
          choices: [" New York City, NY ", " Chicago, IL ", " Scranton, PA ", " Cleveland, OH "],
          correctAnswer: "btn3"
      },{
          question: "Which restaurant is Pam banned from?",
          choices: [" Arby's ", " Chili's ", " Olive Garden ", " Shake Shack "],
          correctAnswer: "btn2"
      }
      ]

//press start and quiz begins and time starts
startBtn.addEventListener('click', initQuiz)

//function for start of quiz
function initQuiz(){
//init globals: Timer starts with first function called and First question appears with 2nd function
startTimer()
loadQuestion()
main.setAttribute("style", "display:block")
}
 //Timer to start when user clicks Start for the quiz
function startTimer() {
  if (totalSeconds > 0) {
    interval = setInterval(function() {
    timeElapsed++;
    renderTime()
      }, 1000);
  } 
}
// When renderTime is called it sets the textContent for the timer html...
function renderTime() {
  minutesDisplay.textContent = getFormattedMinutes();
  secondsDisplay.textContent = getFormattedSeconds();
  if (timeElapsed >= totalSeconds) {
      stopTimer();
    }
  }
  //formatting to appear on page as minutes and seconds
  function getFormattedMinutes() {
      var secondsLeft = totalSeconds - timeElapsed;
      var minutesLeft = Math.floor(secondsLeft / 60);
      var formattedMinutes;
      if (minutesLeft < 10) {
        formattedMinutes = "0" + minutesLeft;
      } else {
        formattedMinutes = minutesLeft;
      }
      return formattedMinutes;
    }
  function getFormattedSeconds() {
      var secondsLeft = (totalSeconds -timeElapsed) % 60;
      var formattedSeconds;
      if (secondsLeft < 10) {
        formattedSeconds = "0" + secondsLeft;
      } else {
        formattedSeconds = secondsLeft;
      }
      return formattedSeconds;
    }
//clears once reaches 0, submit button pressed or all questions are answered
    function stopTimer(){
      clearInterval(interval)
      timeElapsed = 0;
    renderTime();
    }

//Start of Quiz functions loads questions and choices from array to quiz box
function loadQuestion(){
  console.log("i = " + i)
    quizQuestion.textContent = questionArr[i].question;
    choice1.textContent = questionArr[i].choices[0]
    choice2.textContent = questionArr[i].choices[1]
    choice3.textContent = questionArr[i].choices[2]
    choice4.textContent = questionArr[i].choices[3]
  }

//function runs after one of choices buttons is clicked, then moves to next question
//time not subtracting if wrong(need to fix)
function checkAnswers(event){
  i++
   var selection = event.target
   if(selection.matches('.choicebtn')){
       var selectedItem = selection.id
       console.log("answer Selected is " + selectedItem)
       //checks if btn pressed matches correctAnswer in array
       if(selectedItem === questionArr[i-1].correctAnswer){
          score++;
      }
    //if clicked other btn, will deduct time
       else{
           totalSeconds -= 20
       }
       if(i < questionArr.length){
        loadQuestion()
       } else {
         saveData()
       }
      console.log("button user clicked " + selectedItem)
      console.log("correct answer " + questionArr[i-1].correctAnswer)
      console.log("i = " + i)
      console.log("score = " + score)

      //increments i to load the next question in loadQuestion function
    }
    return totalSeconds
  }
 //once submit button is pressed or last question answered Alerts Score
function saveData(){
  alert("Thanks for playing!! you got " + score +" out of 6!");
  stopTimer();
  //removes questions from screen
  quizBox.remove()
  //hides submit button
  submitBtn.setAttribute("style", "display: none")
  resultsBox.setAttribute("style", "display:  block")
}
//event listeners for all the buttons
document.querySelector('#startBtn').addEventListener('click', initQuiz)
document.querySelector('#submitBtn').addEventListener('click', saveData)
document.querySelector('#btn1').addEventListener('click', checkAnswers)
document.querySelector('#btn2').addEventListener('click', checkAnswers)
document.querySelector('#btn3').addEventListener('click', checkAnswers)
document.querySelector('#btn4').addEventListener('click', checkAnswers)


//High Score page after Quiz
var nameInput = document.querySelector("#nameinput");
var highScoreList = document.querySelector("#namelist");
var msgDiv = document.querySelector("#msg");

function displayMessage(type, message) {
  msgDiv.textContent = message;
  msgDiv.setAttribute("class", type);
}

addInitialsBtn.addEventListener("click", function(event) {
  event.preventDefault();
  
  // create user object from submission
  var userInitials = nameInput.value.trim()

  console.log(userInitials);

    // set new submission
    localStorage.setItem("userInitials", JSON.stringify(userInitials));
    
    // get most recent submission and create new list item to display
    var lastUser = JSON.parse(localStorage.getItem("userInitials"));
    var newHighScore = document.createElement("li");
    highScoreList.appendChild(newHighScore)
    highScoreList.textContent = "Initials: " + lastUser + " " + "Score: "+ score;
});
//saved old code for possible timer deduction for incorrect
/*if(incorrect === 0){
  console.log("number incorrect " + incorrect)
timeElapsed = timeElapsed;
} if(incorrect > 0){
  timeElapsed = timeElapsed + incorrect* 20
}*/