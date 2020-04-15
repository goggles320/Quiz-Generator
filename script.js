//Start game function
function setUp()
{
    $("#startBtn").removeClass("hide");
    $("#submitBtn").addClass("hide");
    $("#backBtn").addClass("hide");
    $("#scoreBtn").addClass("hide");
    $("#textArea").text("Try to answer as much questions as possible within the time limit. Any incorrect question will result in a penalty of 5 sec time loss")
}

function startQuiz()
{
    $("#startBtn").on("click",function()
    {
        //alert("test")
        $("#startBtn").addClass("hide");
        
        showQuestion();
        checkSolution();
    })
}

function showQuestion()
{
    i++;
    qText = questionArray[i];
    console.log(i)
    if (qText != null)
    {
        $(".solutions").empty();
        $("#textArea").text(qText.question);
        
        for (var j=0;j<qText.answers.length;j++)
        {
            //console.log(qText.answers[j].text)
            var newBtn = $("<button>");
            newBtn.addClass("btn btn-primary btn-sm ansBtn");
            newBtn.text(qText.answers[j].text);
            newBtn.attr("correct", qText.answers[j].correct);
            $(".solutions").append(newBtn);

        }
    }
}

function checkSolution()
{   
    $(".ansBtn").off("click");
    //Event Listener for all the buttons
    $(".ansBtn").on("click",function()
    {   
        
        if($(this).attr("correct")=="true")
        {
            $(".card-footer").text("Correct");
            return i++;
        }
        else
        {
            $(".card-footer").text("Incorrect");
            return i++;
        }
    })

}




var questionArray = [
    {
        text:"blank"
    },
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
var i=0;
startQuiz();
console.log(i);




