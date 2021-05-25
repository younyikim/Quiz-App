/*
    previous buttom관련 참고
    https://stackoverflow.com/questions/22206222/dynamic-quiz-using-javascript-add-a-back-button
    https://codepen.io/SitePoint/pen/GmPjjL
*/


//문제
let allQuestions = [
    {
        question: "What is the capital of South Korea?",
        choices: ["Pyongyang", "Seoul", "Busan", "Jeju"],
        correctAnswer: 1
    },

    {
        question: "What is the South Korean typical attire called?",
        choices: ["Hanbok", "Yukata", "Kimono", "Suit"],
        correctAnswer: 0
    },
    {
        question: "What is a jimjilbang?",
        choices: ["A one-room mixed hostel", "A bath house", "A purification ceremony", "A Cafe"],
        correctAnswer: 2
    },

    {
        question: "What are the Boseong tea plantations known for?",
        choices: ["Black Tea", "White Tea", "Grenn tea", "Coffee"],
        correctAnswer: 2
    },

    {
        question: "What is a hanok?",
        choices: ["A private neighbourhood", "A palace", "A temple", "A traditional wooden house"],
        correctAnswer: 3
    },

    {
        question: "What is the traditional sport in Korea?",
        choices: ["Taekwondo", "Tennis", "Baseball", "Karate"],
        correctAnswer: 0
    },

    {
        question: "Which Korean city hosted the Asian Games in 2002?",
        choices: ["Seoul", "Seogwipo", "Busan", "Ulsan"],
        correctAnswer: 2
    },

    {
        question: "What is the Korean word for the South Korean national flag?",
        choices: ["Chunggukki", "Taegukki", "Minjuki", "Keungukki"],
        correctAnswer: 1
    },
    {
        question: "What is the population of South Korea?",
        choices: ["48 million", "51 million", "57 million", "45million"],
        correctAnswer: 1
    },

    {
        question: "South Korea has some popular spots for hikers. Which South Korean mountain is the highest?",
        choices: ["Chiri-san", "Bukhansan", "Hallasan", "Seoraksan"],
        correctAnswer: 2
    }
];
/*
    quiz reference
    https://culturalmixology.com/south-korea-quiz/
    https://www.diariesofmagazine.com/quiz-about-south-korea/
    https://www.proprofs.com/quiz-school/story.php?title=3dq-how-much-do-you-know-about-south-korea
*/


// 사용자에게 보여지는 문제를 순서대로 저장하는 배열
let shuffleQuestion = [];

/* 문제를 random하게 선택한다. */
function selectQuestion() {
    while (shuffleQuestion.length < 10) {
        const randomIndex = allQuestions[Math.floor(Math.random() * allQuestions.length)];
        if (!shuffleQuestion.includes(randomIndex)) {
            shuffleQuestion.push(randomIndex);
        }
    }
}

let questionNum = 1;
let userScore = 0;
let wrongAnswer = 0;
let questionIndex = 0;

/* 화면에 문제와 선택지를 보여준다.*/
function showQuestion(idx) {
    selectQuestion();
    const currentQuestion = shuffleQuestion[idx];

    if (questionNum <= 9) {
        document.getElementById("quiz-display-num").innerHTML = "Question" + "0" + questionNum;
    } else {
        document.getElementById("quiz-display-num").innerHTML = "Question " + questionNum;
    }

    document.getElementById("quiz-display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-A-answer").innerHTML = currentQuestion.choices[0];
    document.getElementById("option-B-answer").innerHTML = currentQuestion.choices[1];
    document.getElementById("option-C-answer").innerHTML = currentQuestion.choices[2];
    document.getElementById("option-D-answer").innerHTML = currentQuestion.choices[3];
}

/* 사용자가 선택한 값이 정답과 일치한지 확인한다. */
function checkAnswer() {
    const currentQuestion = shuffleQuestion[questionIndex];
    const currentAnwser = currentQuestion.correctAnswer;
    const selectOption = document.getElementsByName("option");

    for (let i = 0; i < 4; i++) {
        if (selectOption[i].checked) {
            collectUserAnswer(i);
            if (i == currentAnwser) {
                userScore++;
                questionNum++;
                questionIndex++;
                console.log("Correct! score : " + userScore + ", num : " + questionNum);
            } else {
                wrongAnswer++;
                questionNum++;
                questionIndex++;
                console.log("Wrong! score : " + userScore + ", num : " + questionNum);
            }
        }
    }
    // 선택지를 선택하지 않고, next 버튼을 선택하면 경고창을 띄운다.
    if (selectOption[0].checked == false && selectOption[1].checked == false
        && selectOption[2].checked == false && selectOption[3].checked == false) {
        document.querySelector(".quiz-alert-container").style.display = "flex";
        setTimeout(closeChooseOptionAlarm, 700);
    }
}

let collectAnswer = [];
function collectUserAnswer(userAnswer) {
    collectAnswer.push({ "questionNum": questionNum, "questionIndex": questionIndex, "userAnswer": userAnswer });
    console.log(shuffleQuestion[collectAnswer[questionNum - 1].questionIndex].question);
}

/* 이전/다음 버튼의 동작을 설정한다. */
function controllMoveBtn() {
    checkAnswer();
    resetCheckBtn();

    if (questionIndex >= 1 && event.target.id === "btn-previous") {
        // questionNum--;
        // showPreviousQuestion();
        // showQuestion(collectAnswer[questionNum - 1].questionNum, true);
        // console.log(shuffleQuestion[collectAnswer[questionNum - 1].questionNum] + ", " + collectAnswer[questionNum - 1].userAnswer);
    }
    else if (questionIndex <= 9 && event.target.id === "btn-next") {
        showQuestion(questionIndex);
    } else {
        controllResult();
    }
}

/* 다음 문제로 넘어갈때 체크한 radio 버튼을 초기화한다. */
function resetCheckBtn() {
    const selectOption = document.getElementsByName("option");
    for (let i = 0; i < selectOption.length; i++) {
        if (selectOption[i].checked) {
            selectOption[i].checked = false;
        }
    }
}

/* 결과창에 대한 설정 */
function controllResult() {
    document.getElementById("quiz-wrong-answer").innerHTML = wrongAnswer;
    document.getElementById("quiz-correct-answer").innerHTML = userScore;
    document.getElementById("result-container").style.display = "flex";
}

/* 옵션 미선택 시, 보여지는 창을 없앤다. */
function closeChooseOptionAlarm() {
    document.querySelector(".quiz-alert-container").style.display = "none";
}


let previousBtn = document.getElementById("btn-previous");
previousBtn.addEventListener("click", controllMoveBtn);

let nextBtn = document.getElementById("btn-next");
nextBtn.addEventListener("click", controllMoveBtn);

window.addEventListener("load", showQuestion(0));
