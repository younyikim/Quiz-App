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
        correctAnswer: 1
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


let shuffleQuestion = []; // 사용자에게 보여지는 문제를 순서대로 저장하는 배열
let collectAnswer = [];   // 사용자가 선택한 답을 저장하는 배열

let questionNum = 1;      // 사용자가 푼 문제 수
let userScore = 0;
let wrongAnswer = 0;
let questionIndex = 0;   // allQuestions에 저장된 문제의 index

let nextBtn = document.getElementById("btn-next");
nextBtn.addEventListener("click", controllNextBtn);

let prevBtn = document.getElementById("btn-previous");
prevBtn.addEventListener("click", controllPrevBtn);

window.addEventListener("load", showQuestion(0));

/* 문제를 random하게 선택 */
function selectQuestion() {
    while (shuffleQuestion.length < 10) {
        const randomIndex = allQuestions[Math.floor(Math.random() * allQuestions.length)];
        if (!shuffleQuestion.includes(randomIndex)) {
            shuffleQuestion.push(randomIndex);
        }
    }
}


/* 화면에 문제와 선택지를 보여준다.*/
function showQuestion(idx) {
    selectQuestion();
    progressMove();
    const currentQuestion = shuffleQuestion[idx];

    if (questionNum <= 9) {
        document.getElementById("quiz-display-num").innerHTML = "Question" + "0" + questionNum;
    } else {
        document.getElementById("quiz-display-num").innerHTML = "Question " + questionNum;
    }

    document.getElementById("quiz-display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-1-answer").innerHTML = currentQuestion.choices[0];
    document.getElementById("option-2-answer").innerHTML = currentQuestion.choices[1];
    document.getElementById("option-3-answer").innerHTML = currentQuestion.choices[2];
    document.getElementById("option-4-answer").innerHTML = currentQuestion.choices[3];

    /* 아래 코드를 추가하면, 문제를 2개 이상 앞으로 갔다가 다음으로 넘어갈 경우, 이전에 선택했던
        선택을 보여줄 수 있음. 하지만  
        script.js:129 Uncaught TypeError: Cannot read property 'currentAnwser' of undefined
        발생함. 써도 괜찮은가 하는 것은 좀 더 확인해 봐야한다. */
    if (collectAnswer[idx].currentAnwser != undefined) {
        document.getElementsByName("option")[collectAnswer[idx].currentAnwser].checked = true;
    }

}


/* 이전 문제와 선택했던 답안을 보여준다. */
function showPrevQuestion(idx) {
    progressMove();
    const prevQuestion = shuffleQuestion[idx];
    const prevUserAnswer = collectAnswer[idx].currentAnwser;

    if (questionNum <= 9) {
        document.getElementById("quiz-display-num").innerHTML = "Question" + "0" + questionNum;
    } else {
        document.getElementById("quiz-display-num").innerHTML = "Question " + questionNum;
    }

    document.getElementById("quiz-display-question").innerHTML = prevQuestion.question;
    document.getElementById("option-1-answer").innerHTML = prevQuestion.choices[0];
    document.getElementById("option-2-answer").innerHTML = prevQuestion.choices[1];
    document.getElementById("option-3-answer").innerHTML = prevQuestion.choices[2];
    document.getElementById("option-4-answer").innerHTML = prevQuestion.choices[3];

    document.getElementsByName("option")[prevUserAnswer].checked = true;
}

/* 사용자가 선택한 값이 정답과 일치한지 확인한다. */
function checkAnswer() {
    const currentQuestion = shuffleQuestion[questionIndex];
    const currentAnwser = currentQuestion.correctAnswer;
    const selectOption = document.getElementsByName("option");

    for (let i = 0; i < 4; i++) {
        if (selectOption[i].checked) {
            if (collectAnswer[questionIndex] === undefined) {
                if (i === currentAnwser) {
                    userScore++;
                    questionNum++;
                    questionIndex++;
                    /* Test Console */
                    console.log("Correct! score : " + userScore + ", num : " + questionNum);
                } else {
                    wrongAnswer++;
                    questionNum++;
                    questionIndex++;
                    /* Test Console */
                    console.log("Wrong! score : " + userScore + ", num : " + questionNum);
                }

                collectAnswer.push({
                    currentAnwser: i,
                    userScore: userScore,
                    wrongAnswer: wrongAnswer
                });

                /* Test Console */
                console.log(collectAnswer[questionIndex - 1]);
                console.log("questionIndex : " + questionIndex + ", questionNum : " + questionNum);

            }
            /* 이전 문제로 돌아가 다시 문제를 푼 경우, 답을 확인한다.*/
            else {
                let prevOriginAns = collectAnswer[questionIndex].currentAnwser;

                /* 앞의 문제로 되돌아 가는 경우, 
                collectAnswer[questionIndex]의 점수와 오답 수를, 현재 점수와 오답으로 업데이트 */
                collectAnswer[questionIndex].currentAnwser = i;
                collectAnswer[questionIndex].userScore = userScore;
                collectAnswer[questionIndex].wrongAnswer = wrongAnswer;

                /* 수정한 답이 오답인 경우 */
                if (collectAnswer[questionIndex].currentAnwser != currentAnwser) {
                    if (collectAnswer[questionIndex].userScore > 0) {
                        collectAnswer[questionIndex].userScore -= 1;
                        userScore = collectAnswer[questionIndex].userScore;
                    }
                    collectAnswer[questionIndex].wrongAnswer += 1;
                    wrongAnswer = collectAnswer[questionIndex].wrongAnswer;
                }
                /* 수정한 답이 정답인 경우 */
                else {
                    /* 원래 선택했던 답이 정답이었던 경우에는 점수를 조정하지 않고,
                        수정한 답이 정답이 되는 경우에만 점수와 틀린 문제 수를 조정한다. */
                    if (prevOriginAns != i) {
                        collectAnswer[questionIndex].userScore += 1;
                        userScore = collectAnswer[questionIndex].userScore;
                        collectAnswer[questionIndex].wrongAnswer -= 1;
                        wrongAnswer = collectAnswer[questionIndex].wrongAnswer;
                    }
                }

                /* Test Console */
                console.log(collectAnswer[questionIndex]);
                console.log("origin Ans :" + prevOriginAns + ", questionIndex : " + questionIndex + ", questionNum : " + questionNum);

                questionNum++;
                questionIndex++;
            }

        }
    }

    // 입력 유효성 검사 
    // 선택지를 선택하지 않고, next 버튼을 선택하면 경고창을 띄운다. 
    if (selectOption[0].checked == false && selectOption[1].checked == false
        && selectOption[2].checked == false && selectOption[3].checked == false) {

        document.querySelector(".quiz-alert-container").style.display = "flex";
        setTimeout(closeChooseOptionAlarm, 800);
    }
}

/* 다음 버튼의 동작을 설정한다. */
function controllNextBtn() {
    checkAnswer();
    resetCheckBtn();

    if (questionIndex <= 9 && event.target.id === "btn-next") {
        showQuestion(questionIndex);
    } else {
        controllResult();
    }
}

/* 이전 버튼의 동작을 설정한다. */
function controllPrevBtn() {
    if (questionIndex >= 1 && event.target.id === "btn-previous") {
        --questionNum;
        showPrevQuestion(--questionIndex);
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


/* 진행 상황을 보여주는 progress bar */
function progressMove() {
    if (questionNum <= 10) {
        let elem = document.getElementById("quiz-progress-bar");
        let questionCnt = document.getElementById("questionCnt");
        let width = questionNum;

        width *= 10;
        elem.style.width = `${width}%`;
        questionCnt.innerHTML = questionNum + " / 10";
    }
}

