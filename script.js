const NAME = "Saher";
const BESTIE = "Bestie";

const music = document.getElementById("music");
const muteBtn = document.getElementById("muteBtn");
const beginBtn = document.getElementById("beginBtn");
const scenes = document.querySelectorAll(".scene");
const progress = document.getElementById("progress");

const cake = document.getElementById("cake");
const cakeHint = document.getElementById("cakeHint");
const cakeMessage = document.getElementById("cakeMessage");

const envelope = document.getElementById("envelope");
const letterBtn = document.getElementById("letterBtn");

const gift = document.getElementById("gift");
const giftBtn = document.getElementById("giftBtn");
const giftArea = document.getElementById("giftArea");
const giftMessage = document.getElementById("giftMessage");

const portal = document.getElementById("portal");
const finalStart = document.getElementById("finalStart");
const finalMessage = document.getElementById("finalMessage");
const ending = document.getElementById("ending");

const starsCanvas = document.getElementById("stars");
const effectsCanvas = document.getElementById("effects");

const starsCtx = starsCanvas.getContext("2d");
const effectsCtx = effectsCanvas.getContext("2d");

let currentScene = 0;
let musicStarted = false;
let muted = false;
let cakeOpened = false;
let letterOpened = false;
let giftOpened = false;
let finalOpened = false;

let stars = [];
let particles = [];
let fireworks = [];



// ========================================
// NAMES
// ========================================

document.getElementById("name1").textContent = BESTIE;
document.getElementById("name2").textContent = BESTIE;
document.getElementById("name3").textContent = NAME;
document.getElementById("name4").textContent = BESTIE;



// ========================================
// CANVAS
// ========================================

function resizeCanvas() {

    const width = window.innerWidth;
    const height = window.innerHeight;

    starsCanvas.width = width;
    starsCanvas.height = height;

    effectsCanvas.width = width;
    effectsCanvas.height = height;

    createStars();
}

window.addEventListener("resize", resizeCanvas);



function createStars() {

    stars = [];

    for (let i = 0; i < 100; i++) {

        stars.push({

            x: Math.random() * starsCanvas.width,

            y: Math.random() * starsCanvas.height,

            size: Math.random() * 2 + 0.5,

            alpha: Math.random(),

            speed: Math.random() * 0.01 + 0.002

        });

    }
}



function drawStars() {

    starsCtx.clearRect(
        0,
        0,
        starsCanvas.width,
        starsCanvas.height
    );

    stars.forEach(function(star) {

        star.alpha += star.speed;

        if (star.alpha > 1 || star.alpha < 0.1) {

            star.speed *= -1;

        }

        starsCtx.beginPath();

        starsCtx.fillStyle =
            "rgba(255,255,255," + star.alpha + ")";

        starsCtx.arc(
            star.x,
            star.y,
            star.size,
            0,
            Math.PI * 2
        );

        starsCtx.fill();

    });
}



// ========================================
// EFFECT PARTICLES
// ========================================

function createParticles(x, y, amount) {

    for (let i = 0; i < amount; i++) {

        particles.push({

            x: x,
            y: y,

            vx: (Math.random() - 0.5) * 8,

            vy: (Math.random() - 0.5) * 8,

            size: Math.random() * 4 + 2,

            life: 100,

            type: Math.random() > 0.5
                ? "heart"
                : "circle"

        });

    }
}



function drawParticles() {

    particles.forEach(function(particle, index) {

        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += 0.05;
        particle.life--;

        effectsCtx.globalAlpha =
            particle.life / 100;

        effectsCtx.fillStyle =
            particle.type === "heart"
                ? "#ff6f9f"
                : "#f6c978";

        effectsCtx.beginPath();

        effectsCtx.arc(
            particle.x,
            particle.y,
            particle.size,
            0,
            Math.PI * 2
        );

        effectsCtx.fill();

        if (particle.life <= 0) {

            particles.splice(index, 1);

        }

    });

    effectsCtx.globalAlpha = 1;
}



// ========================================
// FIREWORKS
// ========================================

function createFirework(x, y) {

    for (let i = 0; i < 70; i++) {

        const angle =
            Math.random() * Math.PI * 2;

        const speed =
            Math.random() * 6 + 2;

        fireworks.push({

            x: x,
            y: y,

            vx: Math.cos(angle) * speed,

            vy: Math.sin(angle) * speed,

            life: 100,

            size: Math.random() * 3 + 1

        });

    }
}



function drawFireworks() {

    fireworks.forEach(function(firework, index) {

        firework.x += firework.vx;
        firework.y += firework.vy;
        firework.vy += 0.04;
        firework.life--;

        effectsCtx.globalAlpha =
            firework.life / 100;

        effectsCtx.fillStyle =
            Math.random() > 0.5
                ? "#ff7aa8"
                : "#f6c978";

        effectsCtx.beginPath();

        effectsCtx.arc(
            firework.x,
            firework.y,
            firework.size,
            0,
            Math.PI * 2
        );

        effectsCtx.fill();

        if (firework.life <= 0) {

            fireworks.splice(index, 1);

        }

    });

    effectsCtx.globalAlpha = 1;
}



function launchFireworks() {

    const width = effectsCanvas.width;
    const height = effectsCanvas.height;

    createFirework(
        Math.random() * width,
        Math.random() * height * 0.45
    );

}



// ========================================
// ANIMATION LOOP
// ========================================

function animationLoop() {

    drawStars();

    effectsCtx.clearRect(
        0,
        0,
        effectsCanvas.width,
        effectsCanvas.height
    );

    drawParticles();
    drawFireworks();

    requestAnimationFrame(animationLoop);

}



// ========================================
// SCENE CONTROL
// ========================================

function showScene(number) {

    if (number < 0) {
        number = 0;
    }

    if (number > scenes.length - 1) {
        number = scenes.length - 1;
    }

    scenes.forEach(function(scene) {

        scene.classList.remove("active");

    });

    scenes[number].classList.add("active");

    currentScene = number;

    progress.textContent =
        String(number + 1).padStart(2, "0") +
        " / 09";

    if (number === 7) {

        startBirthdayFireworks();

    }

}



function nextScene() {

    if (currentScene < scenes.length - 1) {

        showScene(currentScene + 1);

    }

}



function previousScene() {

    if (currentScene > 0) {

        showScene(currentScene - 1);

    }

}



// ========================================
// BEGIN
// ========================================

beginBtn.addEventListener("click", function() {

    if (!musicStarted) {

        music.play()

            .then(function() {

                musicStarted = true;

            })

            .catch(function() {

                console.log("Music could not start.");

            });

    }

    createParticles(
        effectsCanvas.width / 2,
        effectsCanvas.height / 2,
        30
    );

    setTimeout(function() {

        nextScene();

    }, 700);

});



// ========================================
// MUTE
// ========================================

muteBtn.addEventListener("click", function() {

    muted = !muted;

    music.muted = muted;

    muteBtn.textContent =
        muted ? "🔇" : "🔊";

});



// ========================================
// CAKE
// ========================================

cake.addEventListener("click", function() {

    if (cakeOpened) {
        return;
    }

    cakeOpened = true;

    cake.classList.add("blown");

    cakeHint.textContent =
        "Make a wish... ✨";

    cakeMessage.textContent = "3";

    setTimeout(function() {

        cakeMessage.textContent = "2";

    }, 800);

    setTimeout(function() {

        cakeMessage.textContent = "1";

    }, 1600);

    setTimeout(function() {

        cakeMessage.textContent =
            "HAPPY BIRTHDAY " +
            NAME +
            "! 🎂❤️";

        createParticles(
            window.innerWidth / 2,
            window.innerHeight / 2,
            100
        );

        launchFireworks();
        launchFireworks();

    }, 2400);

});



// ========================================
// LETTER
// ========================================

letterBtn.addEventListener("click", function() {

    if (letterOpened) {
        return;
    }

    letterOpened = true;

    envelope.classList.add("open");

    letterBtn.textContent =
        "❤️ Letter Opened";

    createParticles(
        window.innerWidth / 2,
        window.innerHeight / 2,
        30
    );

});



// ========================================
// GIFT
// ========================================

function openGift() {

    if (giftOpened) {
        return;
    }

    giftOpened = true;

    gift.classList.add("open");

    createParticles(
        window.innerWidth / 2,
        window.innerHeight / 2,
        70
    );

    setTimeout(function() {

        giftArea.classList.add("hidden");

        giftMessage.classList.remove("hidden");

    }, 800);

    setTimeout(function() {

        nextScene();

    }, 2600);

}



giftBtn.addEventListener("click", openGift);

gift.addEventListener("click", openGift);



// ========================================
// BIRTHDAY FIREWORKS
// ========================================

function startBirthdayFireworks() {

    launchFireworks();
    launchFireworks();

    setTimeout(function() {
        launchFireworks();
    }, 700);

    setTimeout(function() {
        launchFireworks();
    }, 1400);

    setTimeout(function() {
        launchFireworks();
    }, 2100);

}



// ========================================
// FINAL SURPRISE
// ========================================

portal.addEventListener("click", function() {

    if (finalOpened) {
        return;
    }

    finalOpened = true;

    finalStart.classList.add("hidden");

    finalMessage.classList.remove("hidden");

    const paragraphs =
        finalMessage.querySelectorAll("p");

    paragraphs.forEach(function(paragraph, index) {

        setTimeout(function() {

            paragraph.classList.add("show");

        }, index * 1200);

    });

    setTimeout(function() {

        finalMessage.classList.add("hidden");

        ending.classList.remove("hidden");

        launchFireworks();
        launchFireworks();
        launchFireworks();

    }, 4800);

});



// ========================================
// SWIPE SUPPORT
// ========================================

let touchStartY = 0;
let touchEndY = 0;

document.addEventListener("touchstart", function(event) {

    touchStartY =
        event.changedTouches[0].screenY;

});



document.addEventListener("touchend", function(event) {

    touchEndY =
        event.changedTouches[0].screenY;

    const difference =
        touchStartY - touchEndY;

    if (Math.abs(difference) < 50) {
        return;
    }

    if (difference > 0) {

        nextScene();

    } else {

        previousScene();

    }

});



// ========================================
// MOUSE WHEEL
// ========================================

let wheelLocked = false;

document.addEventListener("wheel", function(event) {

    if (wheelLocked) {
        return;
    }

    wheelLocked = true;

    if (event.deltaY > 0) {

        nextScene();

    } else {

        previousScene();

    }

    setTimeout(function() {

        wheelLocked = false;

    }, 700);

});



// ========================================
// KEYBOARD
// ========================================

document.addEventListener("keydown", function(event) {

    if (event.key === "ArrowDown") {

        nextScene();

    }

    if (event.key === "ArrowUp") {

        previousScene();

    }

});



// ========================================
// START
// ========================================

resizeCanvas();

animationLoop();

showScene(0);