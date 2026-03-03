const quizQuestions = [
    { q: "You ______ leave your keys in the car.", options: ["should", "shouldn't", "must"], a: "shouldn't" },
    { q: "He ______ a book every day. (Present Simple)", options: ["reads", "read", "reading"], a: "reads" },
    { q: "Beautiful, more ______", options: ["beautifuller", "beautifully", "beautiful"], a: "beautiful" },
    { q: "If I have enough money, I ______ (buy) a car.", options: ["buy", "will buy", "bought"], a: "will buy" },
    { q: "She is ______ than her sister.", options: ["tall", "taller", "tallest"], a: "taller" }
];

let currentIndex = 0;
let totalScore = 0;

// دالة لتحديث الإعلانات برمجياً عند الانتقال بين الشاشات
function triggerAdRefresh() {
    try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
        console.warn("AdSense is not ready or blocked");
    }
}

function navigateTo(screenId) {
    document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
    const target = document.getElementById(screenId);
    target.classList.remove('hidden');
    triggerAdRefresh(); // طلب إعلان جديد عند كل انتقال
}

document.getElementById('start-btn').onclick = () => {
    navigateTo('quiz-screen');
    renderQuestion();
};

function renderQuestion() {
    const data = quizQuestions[currentIndex];
    document.getElementById('question-text').innerText = data.q;
    const list = document.getElementById('options-list');
    list.innerHTML = '';
    
    document.getElementById('next-btn').classList.add('hidden');
    document.getElementById('feedback').classList.add('hidden');
    
    // تحديث شريط التقدم
    const progress = (currentIndex / quizQuestions.length) * 100;
    document.getElementById('progress-fill').style.width = `${progress}%`;

    data.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.innerText = opt;
        btn.className = 'option-btn';
        btn.onclick = () => validateAnswer(btn, opt, data.a);
        list.appendChild(btn);
    });
}

function validateAnswer(btn, selected, correct) {
    const allBtns = document.querySelectorAll('.option-btn');
    allBtns.forEach(b => b.disabled = true);
    
    const feedback = document.getElementById('feedback');
    feedback.classList.remove('hidden');

    if (selected === correct) {
        btn.classList.add('correct');
        totalScore += 2;
        feedback.innerText = "إجابة صحيحة! أحسنت 🌟";
        feedback.style.color = "#2ecc71";
        document.getElementById('current-score').innerText = totalScore;
    } else {
        btn.classList.add('wrong');
        feedback.innerText = `للأسف خاطئة، الجواب الصحيح: ${correct}`;
        feedback.style.color = "#e74c3c";
        allBtns.forEach(b => { if(b.innerText === correct) b.classList.add('correct'); });
    }
    document.getElementById('next-btn').classList.remove('hidden');
}

document.getElementById('next-btn').onclick = () => {
    currentIndex++;
    if (currentIndex < quizQuestions.length) {
        renderQuestion();
    } else {
        document.getElementById('progress-fill').style.width = `100%`;
        navigateTo('result-screen');
        document.getElementById('final-score').innerText = totalScore;
    }
};

document.getElementById('restart-btn').onclick = () => location.reload();
