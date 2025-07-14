const width = 28;
const height = 31;
const layout = [ // Full standard Pacman layout (868 elements: 0=empty, 1=wall, 2=dot, 3=power pill)
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,1,
    1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1,
    3,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,3,1,
    1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1,
    1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,
    1,2,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,2,1,
    1,2,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,2,1,
    1,2,2,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,2,2,1,
    1,1,1,1,1,1,2,1,1,1,1,1,0,1,1,0,1,1,1,1,1,2,1,1,1,1,1,1,
    1,1,1,1,1,1,2,1,1,1,1,1,0,1,1,0,1,1,1,1,1,2,1,1,1,1,1,1,
    1,1,1,1,1,1,2,1,1,0,0,0,0,0,0,0,0,0,0,1,1,2,1,1,1,1,1,1,
    1,1,1,1,1,1,2,1,1,0,1,1,1,0,0,1,1,1,0,1,1,2,1,1,1,1,1,1,
    1,1,1,1,1,1,2,1,1,0,1,0,0,0,0,0,0,1,0,1,1,2,1,1,1,1,1,1,
    1,2,2,2,2,2,2,0,0,0,1,0,0,0,0,0,0,1,0,0,0,2,2,2,2,2,2,1,
    1,1,1,1,1,1,2,1,1,0,1,0,0,0,0,0,0,1,0,1,1,2,1,1,1,1,1,1,
    1,1,1,1,1,1,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,1,1,1,1,1,1,
    1,1,1,1,1,1,2,1,1,0,0,0,0,0,0,0,0,0,0,1,1,2,1,1,1,1,1,1,
    1,1,1,1,1,1,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,1,1,1,1,1,1,
    1,1,1,1,1,1,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,1,1,1,1,1,1,
    1,2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,1,
    1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1,
    1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1,
    3,2,2,2,1,1,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,1,1,2,2,3,1,
    1,1,1,2,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,2,1,1,1,
    1,1,1,2,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,2,1,1,1,
    1,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,1,
    1,2,1,1,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,1,1,2,1,
    1,2,1,1,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,1,1,2,1,
    1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
]; // Adapted from standard Pacman; 1=wall, 2=dot, 3=power, 0=empty (ghost home adjusted)

const board = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score');
const highscoreDisplay = document.getElementById('highscore');
const livesDisplay = document.getElementById('lives');
const levelDisplay = document.getElementById('level');
const pauseBtn = document.getElementById('pause-btn');
const container = document.querySelector('.container');
const fireworksCanvas = document.getElementById('fireworks');
const winMessage = document.getElementById('win-message');
const ctx = fireworksCanvas.getContext('2d');

let score = 0;
let highscore = localStorage.getItem('highscore') || 0;
highscoreDisplay.innerText = `Highscore: ${highscore}`;
let lives = 3;
let level = 1;
let pacmanPosition = 490; // Starting pos
let direction = 1;
let ghosts = [];
let intervalId;
let paused = false;
let powerMode = false;
let powerTimer;
let particles = []; // For fireworks

// Sounds (download MP3s from soundbible.com or freesound.org and host locally)
const eatDotSound = new Audio('sounds/chomp.mp3'); // e.g., pacman chomp.mp3
const powerPillSound = new Audio('sounds/powerup.mp3'); // e.g., power pill sound
const deathSound = new Audio('sounds/death.mp3'); // e.g., waka death
const winSound = new Audio('sounds/victory.mp3'); // e.g., fanfare

// Create board
function createBoard() {
    board.innerHTML = '';
    layout.forEach((val, index) => {
        const square = document.createElement('div');
        square.classList.add('square');
        if (val === 1) square.classList.add('wall');
        if (val === 2) square.classList.add('dot');
        if (val === 3) square.classList.add('power-pill');
        board.appendChild(square);
    });
}

// Check if all dots eaten
function allDotsEaten() {
    return !Array.from(board.children).some(sq => sq.classList.contains('dot') || sq.classList.contains('power-pill'));
}

// Level up
function nextLevel() {
    level++;
    if (level > 5) level = 5;
    levelDisplay.innerText = `Level: ${level}`;
    container.className = `container level-${level}`;
    createBoard(); // Reset dots
    resetPositions();
    clearInterval(intervalId);
    intervalId = setInterval(gameLoop, 200 - (level * 1) * 20); // Faster
    ghosts.forEach(g => g.speed = 250 - level * 20);
}

// Reset positions after death or level
function resetPositions() {
    board.children[pacmanPosition].classList.remove('pacman');
    pacmanPosition = 490;
    board.children[pacmanPosition].classList.add('pacman');
    ghosts.forEach((g, i) => {
        board.children[g.pos].classList.remove('ghost');
        g.pos = 348 + i; // Ghost home
        board.children[g.pos].classList.add('ghost');
    });
}

// Move pacman
function movePacman() {
    board.children[pacmanPosition].classList.remove('pacman');
    const newPos = pacmanPosition + direction;
    if (layout[newPos] !== 1) {
        pacmanPosition = newPos;
    }
    const sq = board.children[pacmanPosition];
    if (sq.classList.contains('dot')) {
        score += 10;
        sq.classList.remove('dot');
        eatDotSound.play();
    }
    if (sq.classList.contains('power-pill')) {
        score += 50;
        sq.classList.remove('power-pill');
        powerPillSound.play();
        powerMode = true;
        clearTimeout(powerTimer);
        powerTimer = setTimeout(() => powerMode = false, 10000);
    }
    board.children[pacmanPosition].classList.add('pacman');
    scoreDisplay.innerText = `Score: ${score}`;
    if (score > highscore) {
        highscore = score;
        localStorage.setItem('highscore', highscore);
        highscoreDisplay.innerText = `Highscore: ${highscore}`;
    }
    checkWin();
}

// Ghost class
class Ghost {
    constructor(speed, startPos, name) {
        this.speed = speed;
        this.pos = startPos;
        this.dir = 1;
        this.name = name;
        this.prevDir = this.dir;
    }
    move() {
        board.children[this.pos].classList.remove('ghost');
        let newDir;
        if (level <= 2) {
            // Random
            const dirs = [1, -1, width, -width].filter(d => d !== -this.prevDir); // Avoid reverse
            newDir = dirs[Math.floor(Math.random() * dirs.length)];
        } else if (level <= 4) {
            // Basic chase: min distance
            newDir = this.getChaseDirection(false);
        } else {
            // Advanced chase: min distance, prefer forward
            newDir = this.getChaseDirection(true);
        }
        const newPos = this.pos + newDir;
        if (layout[newPos] !== 1) {
            this.pos = newPos;
            this.prevDir = newDir;
        }
        board.children[this.pos].classList.add('ghost');
    }
    getChaseDirection(advanced) {
        const dirs = [1, -1, width, -width].filter(d => d !== -this.prevDir || !advanced);
        let minDist = Infinity;
        let bestDir = this.dir;
        dirs.forEach(d => {
            const testPos = this.pos + d;
            if (layout[testPos] !== 1) {
                const dist = Math.hypot((testPos % width - pacmanPosition % width), (Math.floor(testPos / width) - Math.floor(pacmanPosition / width)));
                if (dist < minDist) {
                    minDist = dist;
                    bestDir = d;
                }
            }
        });
        return bestDir;
    }
}

// Init ghosts
function initGhosts() {
    ghosts = [
        new Ghost(250, 348, 'snake1'),
        new Ghost(270, 349, 'snake2'),
        new Ghost(290, 350, 'snake3'),
        new Ghost(310, 351, 'snake4')
    ];
}

// Collision check
function checkCollisions() {
    ghosts.forEach(g => {
        if (g.pos === pacmanPosition) {
            if (powerMode) {
                score += 200;
                g.pos = 348; // Reset ghost
            } else {
                lives--;
                livesDisplay.innerText = `Lives: ${lives}`;
                deathSound.play();
                document.body.classList.add('flash-red');
                setTimeout(() => document.body.classList.remove('flash-red'), 1000);
                resetPositions();
                if (lives <= 0) {
                    clearInterval(intervalId);
                    alert('Game Over!');
                }
            }
        }
    });
}

// Check win
function checkWin() {
    if (allDotsEaten()) {
        if (level === 5) {
            clearInterval(intervalId);
            winSound.play();
            winMessage.style.display = 'block';
            fireworksCanvas.style.display = 'block';
            launchFireworks();
            setTimeout(() => {
                if (confirm('Ninja Master! Restart?')) location.reload();
            }, 5000);
        } else {
            nextLevel();
        }
    }
}

// Fireworks animation (adapted from simple JS examples)
function launchFireworks() {
    function Particle(x, y, vx, vy, color) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.color = color;
        this.life = 100;
    }
    function createExplosion(x, y) {
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffd700']; // Ninjago colors
        for (let i = 0; i < 50; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 5 + 2;
            particles.push(new Particle(x, y, Math.cos(angle) * speed, Math.sin(angle) * speed, colors[Math.floor(Math.random() * colors.length)]));
        }
    }
    function animateFireworks() {
        ctx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
        particles.forEach((p, i) => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.05; // Gravity
            p.life--;
            if (p.life <= 0) particles.splice(i, 1);
            ctx.beginPath();
            ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
        });
        if (Math.random() < 0.1) createExplosion(Math.random() * 600, Math.random() * 400);
        if (particles.length > 0) requestAnimationFrame(animateFireworks);
        else {
            fireworksCanvas.style.display = 'none';
            winMessage.style.display = 'none';
        }
    }
    createExplosion(300, 400); // Start
    animateFireworks();
}

// Game loop
function gameLoop() {
    movePacman();
    ghosts.forEach(g => g.move());
    checkCollisions();
}

// Controls (key)
document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft' || e.key === 'a') direction = -1;
    else if (e.key === 'ArrowUp' || e.key === 'w') direction = -width;
    else if (e.key === 'ArrowRight' || e.key === 'd') direction = 1;
    else if (e.key === 'ArrowDown' || e.key === 's') direction = width;
});

// Swipe mobile
let touchStartX = 0, touchStartY = 0;
board.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
});
board.addEventListener('touchend', e => {
    const deltaX = e.changedTouches[0].screenX - touchStartX;
    const deltaY = e.changedTouches[0].screenY - touchStartY;
    if (Math.abs(deltaX) > Math.abs(deltaY)) direction = deltaX > 0 ? 1 : -1;
    else direction = deltaY > 0 ? width : -width;
});

// Pause
pauseBtn.addEventListener('click', () => {
    paused = !paused;
    pauseBtn.innerText = paused ? 'Resume' : 'Pause';
    if (paused) clearInterval(intervalId);
    else intervalId = setInterval(gameLoop, 200 / level);
});

// Init
createBoard();
initGhosts();
board.children[pacmanPosition].classList.add('pacman');
ghosts.forEach(g => board.children[g.pos].classList.add('ghost'));
intervalId = setInterval(gameLoop, 200);