const kuromi = document.getElementById("kuromi");
const gameOverText = document.getElementById("game-over");
const winnerText = document.getElementById("winner");
const scoreElement = document.getElementById("score");
const game = document.querySelector(".game");

let isJumping = false;
let score = 0;
let gameRunning = true;
const speed = 4; 

document.addEventListener("keydown", (event) => {
    if ((event.code === "Space" || event.key === "ArrowUp") && !isJumping && gameRunning) {
        jump();
    }
});

game.addEventListener("touchstart", (event) => {
    if (!isJumping && gameRunning) {
        jump();
    }
});

function jump() {
    isJumping = true;
    let jumpHeight = 0;
    const jumpInterval = setInterval(() => {
        if (jumpHeight >= 120) {
            clearInterval(jumpInterval);
            const fallInterval = setInterval(() => {
                if (jumpHeight <= 0) {
                    clearInterval(fallInterval);
                    isJumping = false;
                }
                jumpHeight -= 5;
                kuromi.style.bottom = `${jumpHeight + 60}px`; 
            }, 20);
        }
        jumpHeight += 5;
        kuromi.style.bottom = `${jumpHeight + 60}px`; 
    }, 20);
}

function createCactus() {
    const cactus = document.createElement("div");
    cactus.classList.add("cactus");
    cactus.style.left = "800px";
    game.appendChild(cactus);

    let cactusInterval = setInterval(() => {
        if (!gameRunning) {
            clearInterval(cactusInterval);
            cactus.remove();
        }

        const cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));
        const kuromiBottom = parseInt(window.getComputedStyle(kuromi).getPropertyValue("bottom"));

        if (cactusLeft > 0 && cactusLeft < 50 && kuromiBottom <= 100) { 
            gameRunning = false;
            gameOverText.style.display = "block";
            clearInterval(cactusInterval);
            cactus.remove();
        }

        cactus.style.left = `${cactusLeft - speed}px`;

        if (cactusLeft <= -40) {
            clearInterval(cactusInterval);
            cactus.remove();
            if (gameRunning) {
                score++;
                scoreElement.textContent = `Score: ${score}`;
                if (score === 50) {
                    gameRunning = false;
                    winnerText.style.display = "block";
                }
            }
        }
    }, 20);
}

setInterval(() => {
    if (gameRunning) createCactus();
}, 1500); 
