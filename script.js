// مصفوفة الأسئلة (يمكنك إضافة المزيد بنفس الصيغة)
const questions = [
    {
        question: "You ______ leave your keys in the car.",
        options: ["should", "shouldn't", "must"],
        correctAnswer: "shouldn't"
    },
    {
        question: "He ______ a book every day. (Present Simple)",
        options: ["reads", "read", "reading"],
        correctAnswer: "reads"
    },
    {
        question: "She is ______ than her sister.",
        options: ["beautifuler", "more beautiful", "most beautiful"],
        correctAnswer: "more beautiful"
    }
];

// المتغيرات لحفظ حالة الاختبار
let currentQuestionIndex = 0;
let score = 0;

// جلب عناصر واجهة المستخدم من HTML
const homeScreen = document.getElementById('home-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');

const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');

const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const currentScoreElement = document.getElementById('current-score');
const questionTracker = document.getElementById('question-tracker');
const feedbackBox = document.getElementById('feedback-box');
const finalScoreElement = document.getElementById('final-score');

// إضافة مستمعي الأحداث للأزرار الرئيسية
startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', loadNextQuestion);
restartBtn.addEventListener('click', resetQuiz);

function startQuiz() {
    homeScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    loadQuestion();
}

function loadQuestion() {
    // إعادة ضبط الواجهة للسؤال الجديد
    resetState();
    
    // جلب السؤال الحالي
    let currentQuestion = questions[currentQuestionIndex];
    
    // تحديث النصوص
    questionTracker.innerText = `السؤال ${currentQuestionIndex + 1} من ${questions.length}`;
    questionText.innerText = currentQuestion.question;
    
    // إنشاء أزرار الخيارات
    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('option-btn');
        // اتجاه النص يسار لليمين لأن الخيارات باللغة الإنجليزية
        button.setAttribute('dir', 'ltr'); 
        
        button.addEventListener('click', () => selectAnswer(button, currentQuestion.correctAnswer));
        optionsContainer.appendChild(button);
    });
}

function resetState() {
    nextBtn.classList.add('hidden');
    feedbackBox.classList.add('hidden');
    feedbackBox.className = 'feedback hidden'; // تصفير الكلاسات
    feedbackBox.innerText = '';
    optionsContainer.innerHTML = '';
}

function selectAnswer(selectedButton, correctAnswer) {
    const selectedAnswer = selectedButton.innerText;
    
    // إيقاف تفاعل الأزرار بعد الاختيار
    Array.from(optionsContainer.children).forEach(button => {
        button.disabled = true;
        // تلوين الإجابة الصحيحة باللون الأخضر في جميع الحالات
        if (button.innerText === correctAnswer) {
            button.classList.add('correct');
        }
    });

    feedbackBox.classList.remove('hidden');

    // التحقق من الإجابة
    if (selectedAnswer === correctAnswer) {
        score += 2; // إضافة درجتين
        currentScoreElement.innerText = score;
        feedbackBox.classList.add('success');
        feedbackBox.innerText = "إجابة صحيحة! ✔️";
    } else {
        selectedButton.classList.add('wrong');
        feedbackBox.classList.add('error');
        feedbackBox.innerText = `إجابة خاطئة ✖️\nالجواب الصحيح هو: ${correctAnswer}`;
    }

    // إظهار زر السؤال التالي
    nextBtn.classList.remove('hidden');
}

function loadNextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    finalScoreElement.innerText = score;
}

function resetQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    currentScoreElement.innerText = score;
    resultScreen.classList.add('hidden');
    homeScreen.classList.remove('hidden');
}
