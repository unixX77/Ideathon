const questions = [
    {
        question:"What is the Next Prime Number after 7 ?",
        answers:[
            {text:"13", correct:false},
            {text:"11", correct:true},
            {text:"15", correct:false},
            {text:"9", correct:false},
        ]
    },
    {
        question:"Sin(x)*Cosec(x) = ",
        answers:[
            {text:"1", correct:true},
            {text:"0", correct:false},
            {text:"Not Defined", correct:false},
            {text:"tan(x)", correct:false},
        ]
    },
    {
        question:"Value of cos(-x) is ",
        answers:[
            {text:"-cos(x)", correct:false},
            {text:"sin(x)", correct:false},
            {text:"Not defined", correct:false},
            {text:"cos(x)", correct:true},
        ]
    },
    {
        question:"Find the Missing Term : 3, 9, 27, 81, ___.",
        answers:[
            {text:"131", correct:false},
            {text:"180", correct:false},
            {text:"243", correct:true},
            {text:"90", correct:false},
        ]
    },
    {
        question:"Cube root of 15,625 is ___",
        answers:[
            {text:"25", correct:true},
            {text:"35", correct:false},
            {text:"15", correct:false},
            {text:"45", correct:false},
        ]
    },
];

const questionElement=document.getElementById("question");
const answerButtons=document.getElementById("answer");
const nextButton=document.getElementById("next");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");


let currentQuestionIndex=0;
let score=0;
let timeLeft = 30;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    timeLeft = 30;
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionElement.innerHTML=questionNo+". "+currentQuestion.question;
    currentQuestion.answers.forEach(answer=> {
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
    scoreElement.textContent = "Score: " + `${score} out of ${questions.length}`;
    startTimer(timerElement);

}

function startTimer(timerElement) {
    timerElement.textContent = "Time left: " + timeLeft + "s";
    const timer = setInterval(function () {
        timeLeft--;
        timerElement.textContent = "Time left: " + timeLeft + "s";

        if (timeLeft == 0) {
            clearInterval(timer);
            nextButton.style.display="block";
            setTimeout(function() {
                handleNextButton();               
            }, 5000);
            

        }
    }, 1000);
    
    
}

function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct=="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
        
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct=="true"){
            button.classList.add("correct");
           }
            button.disabled=true;
    });
    nextButton.style.display="block";
}


function showScore(){
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})

startQuiz();