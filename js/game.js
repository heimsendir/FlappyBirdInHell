let cvs = document.getElementById('canvas');
let ctx = cvs.getContext('2d');

let bird = new Image();
let bg = new Image();
let fg = new Image();
let pipeUp = new Image();
let pipeBottom = new Image();

bird.src = 'img/bird1.png';
bg.src = 'img/bg.png';
fg.src = 'img/fg.png';
pipeUp.src = 'img/pipeUp.png';
pipeBottom.src = 'img/pipeBottom.png';

//Звуковые файлы

let fly = new Audio();
let score_audio = new Audio();

fly.src = 'audio/fly.mp3';
score_audio.src = 'audio/score.mp3';

let gap = 120;

//Создание блоков

let pipe = [];

pipe[0] = {
    x: cvs.width,
    y: 0
};

//Нажатие кнопки

document.addEventListener('keydown', moveUp);
document.addEventListener('touchstart', moveUp);

function moveUp() {
    yPos -= 1;
    fly.play();
}

//Позиция птички

let xPos = 10;
let yPos = 150;
let grav = 1.1;
let score = 0;

function draw() {
    ctx.drawImage(bg, 0, 0);
    for (let i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

        pipe[i].x--;

        if (pipe[i].x == 80) {
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }
        if (xPos + bird.width >= pipe[i].x
            && xPos <= pipe[i].x + pipeUp.width
            && (yPos <= pipe[i].y + pipeUp.height || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height) {
            pipe = [];
            pipe[0] = {
                x: cvs.width,
                y: 0
            };
            let dialog = document.getElementById('gameOver');
            dialog.showModal();
            let final = document.getElementById('finalScore');
            final.showModal();
            // location.reload();


        }

        if (pipe[i].x == 5) {
            score++;
            score_audio.play();
        }

        if (pipe.length >= 6) {
            pipe.splice(0, 3);
        }
    }
    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, xPos, yPos);
    ctx.fillStyle = '#FFF';
    ctx.font = '24px Arial';
    ctx.fillText('Счет: ' + score, 10, cvs.height - 20)

    yPos += grav;
    requestAnimationFrame(draw);
}

pipeBottom.onload = draw;
