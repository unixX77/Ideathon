const questions = [
    {
        question:"What is the Atomic Number of Oxygen ?",
        answers:[
            {text:"7", correct:false},
            {text:"8", correct:true},
            {text:"16", correct:false},
            {text:"9", correct:false},
        ]
    },
    {
        question:"Total Number of Elements in Periodic Table are ",
        answers:[
            {text:"118", correct:true},
            {text:"110", correct:false},
            {text:"112", correct:false},
            {text:"116", correct:false},
        ]
    },
    {
        question:"The nucleus of an atom consists of ",
        answers:[
            {text:"Electrons and Protons", correct:false},
            {text:"Protons", correct:false},
            {text:"Electrons", correct:false},
            {text:"Protons and Neutrons", correct:true},
        ]
    },
    {
        question:"Full form of CNG is ",
        answers:[
            {text:"Carbonated Natural Gas", correct:false},
            {text:"Compressed Nature Gas", correct:false},
            {text:"Compressed Natural Gas", correct:true},
            {text:"None Of The Above", correct:false},
        ]
    },
    {
        question:"Chemical Symbol of Mercury is ___",
        answers:[
            {text:"Hg", correct:true},
            {text:"Mg", correct:false},
            {text:"Mc", correct:false},
            {text:"All Of The Above", correct:false},
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