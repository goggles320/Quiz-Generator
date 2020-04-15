//Start game function
function setUp()
{   
    //Hide/unhide the required buttons/items 
    $("#startBtn").removeClass("hide");
    $("#submitBtn").addClass("hide");
    $("#backBtn").addClass("hide");
    $("#scoreBtn").addClass("hide");
    $("#textArea").text("Try to answer as much questions as possible within the time limit. Any incorrect question will result in a penalty of 5 sec time loss")
}

//Function that shows first question only
function showFirstQuestion()
{
    i = 0;
    //Hide the start button
    $("#startBtn").toggle();
    qText = questionArray[i];
    //Error check to make sure array has "data"
    if (qText != null)
    {
        //Empty the solutions area & append question to page
        $(".solutions").empty();
        $(".card-text").text(qText.question);
        //Iterate through array that contains the possible solutions
        for (var j=0;j<qText.answers.length;j++)
        {
            //Create buttons which has the possible solutions
            var newBtn = $("<button>");
            newBtn.addClass("btn-dark btn-primary btn-sm ansBtn");
            newBtn.text(qText.answers[j].text);
            newBtn.attr("correct", qText.answers[j].correct);
            $(".solutions").append(newBtn);

            //clear all existing click data from buttons
            $(".ansBtn").off("click");
            
            //Event Listener for all the buttons
            $(".ansBtn").on("click",function()
            {   
                //When selected answer is true...
                if($(this).attr("correct")=="true")
                {
                    //Display correct in footer, increase score by 1
                    $(".card-footer").text("Correct");
                    score++;
                    //Show next set of questions
                    showNextQuestion();
                }
                else
                {
                    //Footer shows incorrect, show new questions
                    $(".card-footer").text("Incorrect");
                    showNextQuestion();
                    //Reduce time by 5 seconds
                    secondsLeft = secondsLeft - 5;
                }
                    
            })

            
        }
    }
    
}

//Function that iterates through the remaining questions
function showNextQuestion()
{
    //Increase question counter by 1
    i++;
    qText = questionArray[i];
    //Chec that current index in array has data
    if (qText != null)
    {
        //Same as above function showQuestion()
        $(".solutions").empty();
        $(".card-text").text(qText.question);
        for (var j=0;j<qText.answers.length;j++)
        {
            
            var newBtn = $("<button>");
            newBtn.addClass("btn btn-dark btn-primary btn-sm ansBtn");
            newBtn.text(qText.answers[j].text);
            newBtn.attr("correct", qText.answers[j].correct);
            $(".solutions").append(newBtn);
            
            $(".ansBtn").off("click");
            
            //Event Listener for all the buttons
            $(".ansBtn").on("click",function()
            {   
                
                if($(this).attr("correct")=="true")
                {
                    
                    $(".card-footer").text("Correct");
                    score++;
                    
                    showNextQuestion();
                }
                else
                {
                    
                    $(".card-footer").text("Incorrect");
                    showNextQuestion();
                    secondsLeft = secondsLeft - 5;
                }
            })
        }
    }
    else
    {   
        //If array has no data, show end of page
        showEnd(score);
    }

}


//Function show shows end of page and hides all required buttons/items
function showEnd(score)
{   
    $(".card-title").addClass("hide");
    $("#textArea").addClass("hide");
    $(".btn").addClass("hide");
    $("#backBtn").removeClass("hide");
    $(".score-title").removeClass("hide");
    $(".card-footer").addClass("hide");
    $(".form-group").removeClass("hide");
    $("#submitBtn").removeClass("hide");
    //Displays player score on page
    $("#score-text").text(score);
    //Event Listener for submit button
    $("#submitBtn").on("click",function()
    {
        //Saves user inputted name with score onto local storage
        userName = $("#userInput").val();
        localStorage.setItem("playerscore", userName + " - " + score + " points");
    }
    )
}

//Function for timer/counter
function setTime() 
{   
    secondsLeft = 60;
    var timerInterval = setInterval(function() 
    {
      secondsLeft--;
      
      $(".timer-text").text(secondsLeft + " seconds left");
      
      if(secondsLeft === 0) 
      {
        clearInterval(timerInterval);
        showEnd();
      }
  
    }, 1000);
}

var questionArray = [
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: 
        [
            {text: "Javascript", correct: false},
            {text: "Terminal/bash", correct: false},
            {text: "for loops", correct: false},
            {text: "console.log", correct: true}
        ]
    },
    {
        question: "The condition in an if / else statment is enclosed within ________.",
        answers: 
        [
            {text: "Quotes", correct: false},
            {text: "Curly Brackets", correct: false},
            {text: "Parentheses", correct: true},
            {text: "Square Brackets", correct: false}
        ]
    },
    {
        question: "Arrays in Javascript can be used to store ___________.",
        answers: 
        [
            {text: "Numbers and strings", correct: false},
            {text: "Other Arrays", correct: false},
            {text: "Booleans", correct: false},
            {text: "All of the above", correct: true}
        ]
    },
    {
        question: "Commonly used data type does not include ____________.",
        answers: 
        [
            {text: "Strings", correct: false},
            {text: "Booleans", correct: false},
            {text: "Alerts", correct: true},
            {text: "Numbers", correct: false}
        ]
    },


];

//Main Body
setUp();
var score = 0;
//Event Listener for starting quiz
$("#startBtn").on("click",function()
{
    
    setTime();
    showFirstQuestion();
    
   
})

//Event Listener for High Score Page
$(".score-title").on("click",function()
{
    showEnd(score);
})



