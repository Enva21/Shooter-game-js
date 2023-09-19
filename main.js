const scoreDisplay = document.querySelector("#scoreDisplay");
const missedDisplay = document.querySelector("#missedDisplay");
const timeDisplay = document.querySelector("#timeDisplay");
const selectBoxCount = document.querySelector("#selectBoxCount");
const displayBoxes = document.querySelector("#displayBoxes");
const easyBtn = document.querySelector("#easyBtn");
const mediumBtn = document.querySelector("#mediumBtn");
const hardBtn = document.querySelector("#hardBtn");
const extremeBtn = document.querySelector("#extremeBtn");

const audio = new Audio();

const gameConfig = {
  score: 0,
  count: 0,
  time: 0,
  missed: -1,
  missedCountMax: 5
};

let interval;

for (let i = 1; i <= 100; i++) {
  selectBoxCount.innerHTML += `<option ${i === 10 ? 'selected' : ''} value=${i}>${i}</option>`;
}

easyBtn.addEventListener("click", () => {
  initGame("easy");
});

mediumBtn.addEventListener("click", () => {
  initGame("medium");
});

hardBtn.addEventListener("click", () => {
  initGame("hard");
});

extremeBtn.addEventListener("click", () => {
  initGame("extreme");
});

displayBoxes.addEventListener("click", (event) => {
  if (gameConfig.missed === gameConfig.missedCountMax || gameConfig.count === gameConfig.score) {
    return;
  }
  audio.play();
  if (gameConfig.count !== 0) {
    if (event.target.id === "displayBoxes") {
      gameConfig.missed++;
      missedDisplay.innerHTML = `<span style="color: ${gameConfig.missed === gameConfig.missedCountMax ? "red" : "green"}">${gameConfig.missed + 1}</span>/${gameConfig.missedCountMax}`;
      if (gameConfig.missed === gameConfig.missedCountMax) {
        lostGame();
      }
    }
  }
});

function initGame(mode) {
  const missedCountMax = mode === "easy" ? 5 : mode === "medium" ? 3 : mode === "hard" ? 1 : 0;
  missedDisplay.innerHTML = `<span style="color:green">0</span>/${missedCountMax}`;
  generateBoxes(Number(selectBoxCount.value), missedCountMax);
  initSound("shoot");
}

function generateBoxes(count, missedCount) {
  const width = displayBoxes.clientWidth - 100;  // 25 - clientWidth
  const height = displayBoxes.clientHeight - 100; // 25 - clientHeight

  displayBoxes.innerHTML = "";
  gameConfig.missedCountMax = missedCount;
  gameConfig.count = count;
  gameConfig.time = 0;
  gameConfig.score = 0;
  gameConfig.missed = -1;
  updateScore();
  initTime();
  initStyle("pointer");

  for (let i = 0; i < count; i++) { // random * (max - min + 1) + min
    const randomTop = Math.floor(Math.random() * (height - 25 + 1) + 25);
    const randomLeft = Math.floor(Math.random() * (width - 25 + 1) + 25);
    displayBoxes.innerHTML += `
      <div onclick="removeBox('box-${i}')" id="box-${i}" style="top:${randomTop}px;left:${randomLeft}px" class="box"></div>
    `;
  }
  // document.querySelectorAll(".box").forEach((box, index) => {
  //   box.addEventListener("click", () => {
  //     removeBox(`box-${index}`);
  //   })
  // });
}

function removeBox(id) {
  if (gameConfig.missed === gameConfig.missedCountMax) {
    return;
  }

  gameConfig.score++;
  document.getElementById(id).remove();
  updateScore();
  checkShoot();
}

function checkShoot() {
  if (gameConfig.score === gameConfig.count) {
    stopTime();
    Swal.fire({
      title: "Win",
      text: `You cleared ${gameConfig.score} box in ${gameConfig.time} second`,
      icon: "success"
    });
    initSound("win");
    audio.play();
  }
}

function updateScore() {
  scoreDisplay.textContent = gameConfig.score;
}

function updateTime() {
  timeDisplay.textContent = `${gameConfig.time}s`;
}

function initTime() {
  stopTime();
  interval = setInterval(() => {
    gameConfig.time++;
    updateTime();
  }, 1000);
}

function stopTime() {
  clearInterval(interval);
}

function lostGame() {
  stopTime();
  initStyle("not-allowed");
  Swal.fire({
    title: "You Lost",
    text: `You cleared ${gameConfig.score} box in ${gameConfig.time} second`,
    icon: "info"
  });
}

function initStyle(cursor) {
  displayBoxes.style.cursor = cursor;
  document.querySelectorAll(".box").forEach(box => {
    box.style.cursor = cursor;
  });
}

function initSound(option) {
  if (option === "shoot") {
    audio.src = "./assets/sounds/deagle_shoot.mp3";
    audio.volume = 0.3;
  } else {
    audio.src = "./assets/sounds/win_sound.mp3";
    audio.volume = 0.7;
  }
}