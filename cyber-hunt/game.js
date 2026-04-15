// ========== CONFIGURATION ==========
// Replace with your Google Apps Script Web App URL
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzbR8VMNR-xqULLv1hD5MWJZWQ_buzVt36j5HOkPPoDDfXX7q4eb_UT8qNLvYYpshUd/exec';

// Game state
let tasks = [];
let answers = {};
let player = {
  nickname: '',
  email: '',
  emailMasked: ''
};

// ========== Helper Functions ==========
function maskEmail(email) {
  if (!email) return '';
  let [local, domain] = email.split('@');
  if (local.length <= 2) return email;
  let maskedLocal = local[0] + '*'.repeat(local.length - 2) + local[local.length-1];
  return maskedLocal + '@' + domain;
}

function getSolvedCount() {
  return Object.values(answers).filter(v => v === true).length;
}

function updateSubmitButton() {
  const btn = document.getElementById('submitResults');
  if (btn) {
    if (getSolvedCount() > 0) {
      btn.disabled = false;
    } else {
      btn.disabled = true;
    }
  }
}

// ========== Registration ==========
document.getElementById('startGameBtn').addEventListener('click', () => {
  const nickname = document.getElementById('nickname').value.trim();
  const email = document.getElementById('email').value.trim();
  if (!nickname || !email) {
    alert('Please enter both nickname and email.');
    return;
  }
  if (!email.includes('@')) {
    alert('Please enter a valid email address.');
    return;
  }
  player.nickname = nickname;
  player.email = email;
  player.emailMasked = maskEmail(email);
  localStorage.setItem('scific_hunt_player', JSON.stringify({nickname, email}));
  document.getElementById('registrationContainer').style.display = 'none';
  document.getElementById('gameContainer').style.display = 'block';
  document.getElementById('displayNickname').innerText = player.nickname;
  document.getElementById('displayEmailMasked').innerText = player.emailMasked;
  loadTasks();
});

// ========== Load tasks and progress ==========
function loadTasks() {
  fetch('tasks.json')
    .then(res => res.json())
    .then(data => {
      tasks = data.tasks;
      loadProgress();
      renderTasks();
    })
    .catch(err => console.error('Failed to load tasks', err));
}

function loadProgress() {
  const saved = localStorage.getItem('scific_hunt');
  if (saved) {
    const obj = JSON.parse(saved);
    answers = obj.answers || {};
  }
  const savedPlayer = localStorage.getItem('scific_hunt_player');
  if (savedPlayer && !player.nickname) {
    const p = JSON.parse(savedPlayer);
    player.nickname = p.nickname;
    player.email = p.email;
    player.emailMasked = maskEmail(p.email);
    document.getElementById('registrationContainer').style.display = 'none';
    document.getElementById('gameContainer').style.display = 'block';
    document.getElementById('displayNickname').innerText = player.nickname;
    document.getElementById('displayEmailMasked').innerText = player.emailMasked;
    loadTasks();
  }
}

function saveProgress() {
  localStorage.setItem('scific_hunt', JSON.stringify({ answers }));
  updateProgressBar();
  updateSubmitButton();
}

function updateProgressBar() {
  const solvedCount = getSolvedCount();
  const percent = (solvedCount / tasks.length) * 100;
  const fill = document.querySelector('.progress-fill');
  if (fill) fill.style.width = `${percent}%`;
  document.querySelectorAll('.task-card').forEach(card => {
    const id = parseInt(card.dataset.id);
    const statusSpan = card.querySelector('.status');
    if (answers[id]) {
      statusSpan.innerText = '✓ Solved';
      statusSpan.classList.add('solved');
      card.classList.add('completed');
    } else {
      statusSpan.innerText = '🔒 Not solved';
      statusSpan.classList.remove('solved');
      card.classList.remove('completed');
    }
  });
}

function renderTasks() {
  const container = document.getElementById('tasksContainer');
  if (!container) return;
  container.innerHTML = '';
  tasks.forEach(task => {
    const card = document.createElement('div');
    card.className = 'task-card';
    if (answers[task.id]) card.classList.add('completed');
    card.dataset.id = task.id;
    const solvedText = answers[task.id] ? '✓ Solved' : '🔒 Not solved';
    card.innerHTML = `
      <div class="task-header">
        <span class="task-id">#${task.id}</span>
        <span class="status ${answers[task.id] ? 'solved' : ''}">${solvedText}</span>
      </div>
      <div class="question">${task.question}</div>
      <div class="answer-area">
        <input type="text" id="input-${task.id}" placeholder="Enter flag / answer" ${answers[task.id] ? 'disabled' : ''}>
        <button class="check-btn" data-id="${task.id}" ${answers[task.id] ? 'disabled' : ''}>Check</button>
        <button class="hint-btn" data-id="${task.id}">Hint</button>
      </div>
      <div class="hint" id="hint-${task.id}">💡 ${task.hint}</div>
    `;
    container.appendChild(card);
  });
  // attach events
  document.querySelectorAll('.check-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(btn.dataset.id);
      const input = document.getElementById(`input-${id}`);
      const userAnswer = input.value.trim().toLowerCase();
      const task = tasks.find(t => t.id === id);
      if (userAnswer === task.answer.toLowerCase()) {
        answers[id] = true;
        saveProgress();
        renderTasks();
        alert(`✅ Task ${id} solved! Flag recorded.`);
      } else {
        alert(`❌ Wrong answer. Try again or use hint.`);
      }
    });
  });
  document.querySelectorAll('.hint-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(btn.dataset.id);
      const hintDiv = document.getElementById(`hint-${id}`);
      hintDiv.classList.toggle('show');
    });
  });
  updateProgressBar();
  updateSubmitButton();
}

// ========== Submit results to Google Sheets ==========
async function submitResults() {
  const solvedCount = getSolvedCount();
  if (solvedCount === 0) {
    alert('You haven\'t solved any tasks yet. Solve at least one to submit.');
    return;
  }
  const completionTime = new Date().toISOString();
  const payload = {
    nickname: player.nickname,
    email: player.email,
    solvedCount: solvedCount,
    totalTasks: tasks.length,
    completionTime: completionTime,
    solvedTasks: tasks.map(t => ({ id: t.id, solved: answers[t.id] || false })),
    userAgent: navigator.userAgent
  };
  try {
    await fetch(SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const msg = document.getElementById('statusMsg');
    msg.innerHTML = '✅ Results submitted successfully! The admin will review. You can submit again later after solving more tasks.';
    msg.style.color = 'var(--neon)';
  } catch (err) {
    console.error(err);
    alert('Submission failed. Please screenshot your progress and email to scific@csn.khai.edu');
  }
}

// ========== Initialize ==========
document.addEventListener('DOMContentLoaded', () => {
  const savedPlayer = localStorage.getItem('scific_hunt_player');
  if (savedPlayer) {
    const p = JSON.parse(savedPlayer);
    player.nickname = p.nickname;
    player.email = p.email;
    player.emailMasked = maskEmail(p.email);
    document.getElementById('registrationContainer').style.display = 'none';
    document.getElementById('gameContainer').style.display = 'block';
    document.getElementById('displayNickname').innerText = player.nickname;
    document.getElementById('displayEmailMasked').innerText = player.emailMasked;
    loadTasks();
  } else {
    document.getElementById('registrationContainer').style.display = 'block';
    document.getElementById('gameContainer').style.display = 'none';
  }
  const submitBtn = document.getElementById('submitResults');
  if (submitBtn) submitBtn.addEventListener('click', submitResults);
});
