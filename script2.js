

let startTime=0;
let elapsedTime = 0;
let timerInterval =0;
let isRunning = false;
let lapCounter = 1;

const timeDisplay = document.getElementById('time');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsTable = document.getElementById('lapsTable').getElementsByTagName('tbody')[0];

startPauseBtn.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(timerInterval);
        startPauseBtn.textContent = 'Start';
    } else {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTime, 100);
        startPauseBtn.textContent = 'Pause';
    }
    isRunning = !isRunning;
});

resetBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    elapsedTime = 0;
    isRunning = false;
    startPauseBtn.textContent = 'Start';
    timeDisplay.textContent= "00:00:00"
    lapsTable.innerHTML = '';
    lapCounter = 1;
});

lapBtn.addEventListener('click', () => {
    if (isRunning) {
        const lapTime = formatTime(elapsedTime);
        const row = lapsTable.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        cell1.textContent = lapCounter++;
        cell2.textContent = lapTime;
    }
});

function updateTime() {
    elapsedTime = Date.now() - startTime;
    timeDisplay.textContent = formatTime(elapsedTime);
}

function formatTime(time) {
    const date = new Date(time);
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(Math.floor(date.getUTCMilliseconds() / 10)).padStart(2, '0');
    return `${minutes}:${seconds}:${milliseconds}`;
}

