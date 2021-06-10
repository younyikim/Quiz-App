var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

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
        choices: ["Black Tea", "White Tea", "Green tea", "Coffee"],
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

let test = 0;
window.addEventListener("load", showQuestion(0));

let nextBtn = document.getElementById("btn-next");
nextBtn.addEventListener("click", controllNextBtn);

let prevBtn = document.getElementById("btn-previous");
prevBtn.addEventListener("click", controllPrevBtn);



/* 문제를 random하게 선택 */
function selectQuestion() {
    while (shuffleQuestion.length < 10) {
        const randomIndex = allQuestions[Math.floor(Math.random() * Object.keys(allQuestions).length)];

        // IE - Pollyfill for includes()
        if (!Array.prototype.includes) {
            Object.defineProperty(Array.prototype, "includes", {
                enumerable: false,
                value: function (obj) {
                    var newArr = this.filter(function (el) {
                        return el == obj;
                    });
                    return newArr.length > 0;
                }
            });
        } else {
            if (!shuffleQuestion.includes(randomIndex)) {
                shuffleQuestion.push(randomIndex);
            }
        }

    }
}


/* 화면에 문제와 선택지를 보여준다.*/
function showQuestion(idx) {
    selectQuestion();

    const currentQuestion = shuffleQuestion[idx];

    if (questionNum == 1 || $(".quiz-alert-container").css("display") === "flex") {
        $(".quiz-container").hide();
    }
    $(".quiz-container")
        .fadeOut(function () {
            progressMove();
            if (questionNum <= 9) {
                $("#quiz-display-num").html("Question 0" + questionNum);
            } else {
                $("#quiz-display-num").html("Question " + questionNum);
            }

            $("#quiz-display-question").html(currentQuestion.question);
            $("#option-1-answer").html(currentQuestion.choices[0]);
            $("#option-2-answer").html(currentQuestion.choices[1]);
            $("#option-3-answer").html(currentQuestion.choices[2]);
            $("#option-4-answer").html(currentQuestion.choices[3]);

            $(".quiz-container").fadeIn('fast');
        });
}

/* 이전 문제와 선택했던 답안을 보여준다. */
function showPrevQuestion(idx) {
    progressMove();
    const prevQuestion = shuffleQuestion[idx];
    const prevUserAnswer = collectAnswer[idx].currentAnwser;

    $(".quiz-container")
        .fadeOut(function () {
            progressMove();
            if (questionNum <= 9) {
                $("#quiz-display-num").text("Question 0" + questionNum);
            } else {
                $("#quiz-display-num").html("Question " + questionNum);
            }

            $("#quiz-display-question").html(prevQuestion.question);
            $("#option-1-answer").html(prevQuestion.choices[0]);
            $("#option-2-answer").html(prevQuestion.choices[1]);
            $("#option-3-answer").html(prevQuestion.choices[2]);
            $("#option-4-answer").html(prevQuestion.choices[3]);

            $($("input[name='option']").get(prevUserAnswer)).prop('checked', true);
            $(".quiz-container").fadeIn('fast');
        })
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
    document.getElementById("quiz-user").innerHTML = localStorage.getItem("username");
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
        let questionCnt = document.getElementById("questionCnt");
        let width = questionNum;

        width *= 10;
        $("#progress-bar")
            .css("width", width + "%")
            .attr("aria-valuenow", width);
        questionCnt.innerHTML = questionNum + " / 10";
    }
}