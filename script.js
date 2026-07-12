let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "green", "red", "blue"];

let started = false;
let level = 0;

let h3 = document.querySelector("h3");

let highScore = localStorage.getItem("highScore") || 0;

document.getElementById(
    "highScore"
).innerText = `High Score: ${highScore}`;

document.addEventListener("keypress", function () {

    if (!started) {
        started = true;
        levelUp();
    }

});

function gameFlash(btn) {

    btn.classList.add("gameflash");

    setTimeout(() => {
        btn.classList.remove("gameflash");
    }, 250);
}

function userFlash(btn) {

    btn.classList.add("userflash");

    setTimeout(() => {
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp() {

    userSeq = [];

    level++;

    h3.innerText = `Level ${level}`;

    document.getElementById(
        "currentScore"
    ).innerText = `Level: ${level}`;

    let randIdx = Math.floor(Math.random() * 4);

    let randColor = btns[randIdx];

    let randBtn = document.querySelector(
        `.${randColor}`
    );

    gameSeq.push(randColor);

    gameFlash(randBtn);
}

function checkAns(idx) {

    if (userSeq[idx] === gameSeq[idx]) {

        if (userSeq.length === gameSeq.length) {

            setTimeout(() => {
                levelUp();
            }, 1000);

        }

    } else {

        document.body.style.background = "#ef4444";

        setTimeout(() => {

            document.body.style.background =
            "linear-gradient(135deg,#0f172a,#111827,#1e293b)";

        }, 300);

        if (level > highScore) {

            highScore = level;

            localStorage.setItem(
                "highScore",
                highScore
            );

            document.getElementById(
                "highScore"
            ).innerText =
            `High Score: ${highScore}`;
        }

        h3.innerHTML =
        `Game Over! Score: <b>${level}</b><br>Press Any Key To Restart`;

        reset();
    }
}

function btnPress() {

    let btn = this;

    userFlash(btn);

    let userColor = btn.getAttribute("id");

    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");

for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {

    started = false;

    gameSeq = [];

    userSeq = [];

    level = 0;

    document.getElementById(
        "currentScore"
    ).innerText = "Level: 0";
}