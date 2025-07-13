// 퀴즈 데이터 (문제와 정답을 객체 형태로 저장)
const quizData = {
    '1': {
        question: "프로그래밍에서 특정 조건을 확인하여, 그 조건이 참(True)일 때와 거짓(False)일 때 각각 다른 코드를 실행하도록 만드는 명령문을 무엇이라고 할까요?",
        answer: "조건문"
    },
    '2': {
        question: "숫자, 문자 등 여러 개의 데이터를 순서대로 담을 수 있는 파이썬의 자료 형태로, [ ](대괄호)를 사용하여 만드는 이것은 무엇일까요?",
        answer: "리스트" // 정답 확인 시 'List'도 처리
    },
    '3': {
        question: "특정 작업을 반복적으로 수행해야 할 때 사용하는 명령문으로, 정해진 횟수만큼 또는 특정 조건이 만족될 때까지 코드를 계속 실행시키는 이것은 무엇이라고 할까요?",
        answer: "반복문"
    }
};

// HTML에서 사용할 요소들을 변수에 할당
const objects = document.querySelectorAll('.object');
const modalContainer = document.getElementById('modal-container');
const quizQuestion = document.getElementById('quiz-question');
const quizAnswerInput = document.getElementById('quiz-answer-input');
const submitAnswerBtn = document.getElementById('submit-answer-btn');
const quizResult = document.getElementById('quiz-result');
const closeModalBtn = document.getElementById('close-modal-btn');

// 현재 열린 퀴즈의 정답을 저장하기 위한 변수
let currentAnswer = '';

// 모든 오브젝트에 대해 클릭 이벤트 설정
objects.forEach(obj => {
    obj.addEventListener('click', () => {
        // 클릭된 오브젝트의 'data-quiz-id' 속성 값을 가져옴 (예: '1', '2', '3')
        const quizId = obj.dataset.quizId;
        const quiz = quizData[quizId];

        // 모달 창에 해당 퀴즈의 질문을 표시
        quizQuestion.textContent = quiz.question;
        // 현재 퀴즈의 정답을 currentAnswer 변수에 저장
        currentAnswer = quiz.answer;
        
        // 모달 창을 열기 전에 이전 입력값과 결과 메시지를 초기화
        quizAnswerInput.value = '';
        quizResult.textContent = '';
        
        // 모달 창을 화면에 표시
        modalContainer.classList.remove('hidden');
    });
});

// '정답 확인' 버튼 클릭 이벤트 설정
submitAnswerBtn.addEventListener('click', () => {
    // 사용자가 입력한 답을 가져와 앞뒤 공백을 제거
    const userAnswer = quizAnswerInput.value.trim();

    // 정답과 사용자 답을 비교
    // 2번 문제의 경우, '리스트' 또는 'List', 'list' 모두 정답으로 처리
    let isCorrect = false;
    if (currentAnswer === "리스트") {
        if (userAnswer.toLowerCase() === "리스트" || userAnswer.toLowerCase() === "list") {
            isCorrect = true;
        }
    } else if (userAnswer === currentAnswer) {
        isCorrect = true;
    }
    
    // 비교 결과에 따라 다른 메시지를 표시
    if (isCorrect) {
        quizResult.textContent = "정답입니다! 😆";
        quizResult.style.color = 'green';
    } else {
        quizResult.textContent = `틀렸어요! 정답은 '${currentAnswer}'입니다. 😭`;
        quizResult.style.color = 'red';
    }
});

// '닫기' 버튼 클릭 시 모달 창을 숨김
closeModalBtn.addEventListener('click', () => {
    modalContainer.classList.add('hidden');
});

// 모달 창의 바깥(어두운 배경)을 클릭했을 때도 모달 창이 닫히도록 설정
modalContainer.addEventListener('click', (event) => {
    // 만약 클릭된 요소가 모달 배경 그 자체라면
    if (event.target === modalContainer) {
        modalContainer.classList.add('hidden');
    }
});