# Quiz-App

#### HTML, CSS, JavaScript를 이용한 퀴즈 웹 어플리케이션 프로젝트입니다.   

----------------------------------------------------------------------
<img src="https://img.shields.io/badge/HTML-E34F26?style=flat-square&logo=html5&logoColor=white"/></a>
<img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=CSS3&logoColor=white"/></a>
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white"/></a>

##### Version 1
* Radio 버튼을 사용하여 퀴즈의 정답을 선택할 수 있다.
* 사용자의 점수를 기록하여 완료후 사용자에게 최종 점수 및 틀린 문제 수, 맞은 문제 수를 보여준다.
* Next 버튼 클릭시, 동적으로 다음 질문을 추가하고, 화면에서 현재 질문을 제거한다.
* media query 적용

----------------------------------------------------------------------
##### Version 2
* 클라이언트 측의 데이터 유효성 검사 추가(다음 단계 진행전, 답안 선택 여부 확인)
* Back 버튼 추가. 이미 대답한 질문에 대해선 선택한 라디오 버튼을 표시.
* 질문과 선택지에 fadeIn, fadeOut 애니메이션 추가
* Chrome 최적화
* 사용자 인증 추가(HTML5 브라우저 저장소에 로그인 인증 저장 - localStorage 사용)
* 사용자 기억을 위한 localStorage 사용 
----------------------------------------------------------------------    
#### Version 3 
* Bootstrap 적용
* [easy-pie-chart](https://github.com/rendro/easy-pie-chart) 플러그인 사용
* 퀴즈를 수행하는 모든 사용자를 계속 기록하고, 각 사용자에게 다른 퀴즈 수행자의 점수 중 자신의 점수 순위를 보여준다.
  * 이 퀴즈 프로그램에서는 별도의 `DB를 사용하지 않고`, `브라우저 저장소만을 사용`하여 순위를 표시한다.     
  따라서 `동일 브라우저 내`에서 퀴즈를 푼 참가자에 한하여 순위가 표시된다. 
----------------------------------------------------------------------      
### 프로그램 실행 화면  
[Quiz Application Test On Live](https://younyikim.github.io/Quiz-App/)

퀴즈 로그인 화면            |  로그인 이후 화면
:-------------------------:|:-------------------------:
<img src="/img/quiz_login_1.PNG"> | <img src="/img/quiz_greeting.PNG">
퀴즈 풀이 화면     |  결과 화면
<img src="/img/quiz_main.PNG"> | <img src="/img/quiz_result.PNG"> 
----------------------------------------------------------------------     

##### Reference
* [Quiz: How Much Do You Know About South Korea?](https://culturalmixology.com/south-korea-quiz/)
* [South Korea Quiz](https://culturalmixology.com/south-korea-quiz/)
* [Quiz: How Much Do You Know About South Korea? - (2)](https://www.proprofs.com/quiz-school/story.php?title=3dq-how-much-do-you-know-about-south-korea)

* [Building a Simple Quiz with HTML, CSS and JavaScript](https://dev.to/sulaimonolaniran/building-a-simple-quiz-with-html-css-and-javascript-4elp)
* [How to Make a Simple JavaScript Quiz](https://www.sitepoint.com/simple-javascript-quiz/)

