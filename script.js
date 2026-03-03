const qBank = [
    { q: "You (should / shouldn't) leave your keys.", options: ["should", "shouldn't"], a: "shouldn't" },
    { q: "He read a book (Present Simple)", options: ["He reads a book", "He reading a book"], a: "He reads a book" },
    { q: "Beautiful, more ______", options: ["beautifuller", "beautiful", "most beautiful"], a: "beautiful" }
];

let idx = 0;
let score = 0;

function refreshAds() {
    try { (adsbygoogle = window.adsbygoogle || []).push({}); } catch(e){}
}

function nav(to) {
    document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
    document.getElementById(to).classList.remove('hidden');
    refreshAds();
}

document.getElementById('start-btn').onclick = () => {
    nav('quiz-screen');
    loadQ();
};

function loadQ() {
    const data = qBank[idx];
    document.getElementById('q-text').innerText = data.q;
    const grid = document.getElementById('options-grid');
    grid.innerHTML = '';
    document.getElementById('next-btn').classList.add('hidden');
    document.getElementById('feedback').classList.add('hidden');
    document.getElementById('progress-inner').style.width = `${(idx/qBank.length)*100}%`;

    data.options.forEach(o => {
        const b = document.createElement('button');
        b.className = 'opt-btn';
        b.innerText = o;
        b.onclick = () => check(b, o, data.a);
        grid.appendChild(b);
    });
}

function check(b, sel, cor) {
    document.querySelectorAll('.opt-btn').forEach(btn => btn.disabled = true);
    const f = document.getElementById('feedback');
    f.classList.remove('hidden');

    if(sel === cor) {
        b.classList.add('correct');
        score += 2;
        document.getElementById('live-score').innerText = score;
        f.innerText = "صحيح ✅";
    } else {
        b.classList.add('wrong');
        f.innerText = `خطأ، الجواب: ${cor}`;
    }
    document.getElementById('next-btn').classList.remove('hidden');
}

document.getElementById('next-btn').onclick = () => {
    idx++;
    if(idx < qBank.length) loadQ();
    else {
        nav('result-screen');
        document.getElementById('final-res').innerText = score;
    }
};

document.getElementById('retry-btn').onclick = () => location.reload();
