var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

const loginForm = document.getElementById("showcase-login-form");
const loginInput = loginForm.querySelector("input");
const greeting = document.getElementById("quiz-user-greeting");

//상수
const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

// 사용자의 이름을 localStorage에 저장한다.
function onLoginSubmit(event) {
    event.preventDefault();
    const username = loginInput.value;
    localStorage.setItem(USERNAME_KEY, username);

    let $result = $("#showcase-login-form");

    $result.fadeOut("slow", function () {
        document.getElementById("showcase-login-form").style.display = "none";
        paintGreeting(username);
    });
}

// 사용자에게 환영 메세지를 출력한다.
function paintGreeting(username) {
    $(greeting).fadeOut("fast", function () {
        greeting.classList.remove(HIDDEN_CLASSNAME);
        $(greeting).text(`Welcome,  ${username}`).fadeIn("fast");
        $("#showcase-login-button").css("display", "none");
        $("#showcase-start-button").css("display", "flex");
    });
}


//localStorage에 저장된 key 값을 가져온다.
const saveUserName = localStorage.getItem(USERNAME_KEY);

if (saveUserName === null) {
    //처음 방문한 경우, 이름 입력 창을 보여준다.
    let $loginForm = $("#showcase-login-form");
    $loginForm.hide();
    $loginForm.fadeIn("slow").css("display", "flex");
    $loginForm.submit(onLoginSubmit);
} else {
    //이미 방문한 적이 있는 경우, 환영 메세지를 출력한다.
    paintGreeting(saveUserName);
}