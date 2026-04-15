// Game state
let tasks = [];
let answers = {};

async function loadTasks() {
  const response = await fetch('tasks.json');
  const data = await response.json();
  tasks = data.tasks;
  loadProgress();
  renderTasks();
}

function loadProgress() {
  const saved = localStorage.getItem('scific_hunt');
  if (saved) {
    const obj = JSON.parse(saved);
    answers = obj.answers || {};
  }
}

function saveProgress() {
  localStorage.setItem('scific_hunt', JSON.stringify({ answers }));
  updateProgressBar();
}

function updateProgressBar() {
  const solvedCount = Object.values(answers).filter(v => v === true).length;
  const percent = (solvedCount / tasks.length) * 100;
  const fill = document.querySelector('.progress-fill');
  if (fill) fill.style.width = `${percent}%`;
  // also update status texts
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
  const allSolved = Object.values(answers).filter(v => v === true).length === tasks.length;
  const submitDiv = document.querySelector('.completion-section');
  if (submitDiv) {
    if (allSolved) {
      submitDiv.style.display = 'block';
    } else {
      submitDiv.style.display = 'none';
    }
  }
}

function renderTasks() {
  const container = document.getElementById('tasksContainer');
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
        renderTasks(); // re-render to disable input
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
}

function submitResults() {
  const solved = Object.values(answers).filter(v => v === true).length;
  if (solved !== tasks.length) {
    alert(`You have solved only ${solved} out of ${tasks.length}. Solve all to claim prize!`);
    return;
  }
  // Prepare data to send
  const playerData = {
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    solvedTasks: tasks.map(t => ({ id: t.id, solved: answers[t.id] })),
    allSolved: true
  };
  const dataStr = JSON.stringify(playerData, null, 2);
  // Option 1: Copy to clipboard and show email instructions
  navigator.clipboard.writeText(dataStr).then(() => {
    const msg = document.getElementById('statusMsg');
    msg.innerHTML = '✅ Your results copied to clipboard! Please email them to <strong>scific@csn.khai.edu</strong> with subject "Cyber Hunt Results". We will contact winners.';
  }).catch(() => {
    alert('Could not copy automatically. Please manually send the data below to scific@csn.khai.edu');
  });
  // Also show data in console for debugging
  console.log('Player data:', playerData);
}

document.addEventListener('DOMContentLoaded', () => {
  loadTasks();
  const submitBtn = document.getElementById('submitResults');
  if (submitBtn) submitBtn.addEventListener('click', submitResults);
});