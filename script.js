const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 300;
canvas.height = 500;

// player
let player = { x: 130, y: 420, w: 40, h: 40 };

// obstacle
let obs = { x: 130, y: -40, w: 40, h: 40 };

let score = 0;

// controls
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" && player.x > 0) player.x -= 20;
  if (e.key === "ArrowRight" && player.x < 260) player.x += 20;
});

function drawPlayer() {
  ctx.fillStyle = "lime";
  ctx.fillRect(player.x, player.y, player.w, player.h);
}

function drawObstacle() {
  ctx.fillStyle = "red";
  ctx.fillRect(obs.x, obs.y, obs.w, obs.h);

  obs.y += 5;

  if (obs.y > 500) {
    obs.y = -40;
    score++;
    document.getElementById("score").innerText = score;

    // speed increase (simple difficulty scaling)
    obsSpeedUp();
  }

  // collision
  if (
    player.x < obs.x + obs.w &&
    player.x + player.w > obs.x &&
    player.y < obs.y + obs.h &&
    player.y + player.h > obs.y
  ) {
    alert("Game Over! Score: " + score);
    location.reload();
  }
}

function obsSpeedUp() {
  if (score % 5 === 0) {
    obs.y += 1; // slight speed increase logic
  }
}

function loop() {
  ctx.clearRect(0, 0, 300, 500);
  drawPlayer();
  drawObstacle();
  requestAnimationFrame(loop);
}

loop();
