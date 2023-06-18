const questions = [
    {
        question:"What does DNA stand for?",
        answers:[
            {text:"Di Nucleic Acid", correct:false},
            {text:"DeOxyRibo Nucleic Acid", correct:true},
            {text:"Decreased Nucleic Acid", correct:false},
            {text:"None of the Above", correct:false},
        ]
    },
    {
        question:"The Rarest Blood Group is ",
        answers:[
            {text:"AB-", correct:true},
            {text:"AB+", correct:false},
            {text:"O+", correct:false},
            {text:"O-", correct:false},
        ]
    },
    {
        question:"Metal(s) Present in Haemoglobin is ",
        answers:[
            {text:"Iron", correct:true},
            {text:"Magnesium", correct:false},
            {text:"Calcium", correct:false},
            {text:"All of the above", correct:false},
        ]
    },
    {
        question:"Number of chromosomes in the human gene is ",
        answers:[
            {text:"23", correct:false},
            {text:"40", correct:false},
            {text:"46", correct:true},
            {text:"43", correct:false},
        ]
    },
    {
        question:"The Longest and Largest Bone in the human body is ",
        answers:[
            {text:"Femur", correct:true},
            {text:"Spinal Cord", correct:false},
            {text:"Humerus", correct:false},
            {text:"Fibula", correct:false},
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