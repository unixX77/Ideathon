const questions = [
    {
        question:"Theory of Relativity is presented by ",
        answers:[
            {text:"Isaac Newton", correct:false},
            {text:"Albert Einstein", correct:true},
            {text:"Stephen Hawking", correct:false},
            {text:"Marie Curie", correct:false},
        ]
    },
    {
        question:"Ratio of displacement and time is ",
        answers:[
            {text:"Velocity", correct:true},
            {text:"Speed", correct:false},
            {text:"Acceleration", correct:false},
            {text:"None Of The Above", correct:false},
        ]
    },
    {
        question:"Proton carries a ",
        answers:[
            {text:"Negative Charge", correct:false},
            {text:"No Charge", correct:false},
            {text:"Neutral Charge", correct:false},
            {text:"Positive Charge", correct:true},
        ]
    },
    {
        question:"Hertz is the SI Unit of ",
        answers:[
            {text:"Power", correct:false},
            {text:"Pressure", correct:false},
            {text:"Frequency", correct:true},
            {text:"Weight", correct:false},
        ]
    },
    {
        question:"According to the quantum theory of light, light is carried in discrete units called ",
        answers:[
            {text:"Photons", correct:true},
            {text:"Electrons", correct:false},
            {text:"Photoelectrons", correct:false},
            {text:"Protons", correct:false},
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