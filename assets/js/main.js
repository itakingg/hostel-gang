/* =========================
   INFINITE SCROLL CAROUSEL
========================= */

const track = document.querySelector(".track");

if (track) {
  track.innerHTML += track.innerHTML;

  let scrollX = 0;
  let speed = 0.5;

  function autoScroll() {
    scrollX += speed;
    track.style.transform = `translateX(-${scrollX}px)`;

    if (scrollX >= track.scrollWidth / 2) {
      scrollX = 0;
    }

    requestAnimationFrame(autoScroll);
  }

  autoScroll();

  if (window.innerWidth >= 769) {
    track.addEventListener("mouseenter", () => (speed = 0));
    track.addEventListener("mouseleave", () => (speed = 0.5));
  }
}

/* =========================
   CENTER FOCUS SYSTEM
========================= */

function updateCenterFocus() {
  const center = window.innerWidth / 2;

  document.querySelectorAll(".card").forEach((card) => {
    const rect = card.getBoundingClientRect();
    const cardCenter = rect.left + rect.width / 2;

    const distance = Math.abs(center - cardCenter);

    if (distance < rect.width / 2) {
      card.classList.add("active");
    } else {
      card.classList.remove("active");
    }
  });
}

function focusLoop() {
  updateCenterFocus();
  requestAnimationFrame(focusLoop);
}

focusLoop();

/* =========================
   PRELOADER + CINEMATIC ENTER
========================= */

const preloader = document.getElementById("preloader");
const enterBtn = document.getElementById("enter-btn");
const music = document.getElementById("bg-music");
const toggle = document.getElementById("music-toggle");
const overlay = document.getElementById("enter-overlay");

let isPlaying = false;

/* STEP 1: LOADING → SHOW BUTTON */
window.addEventListener("load", () => {
  setTimeout(() => {
    preloader.classList.add("ready");
  }, 2000);
});

/* STEP 2: CLICK ENTER */
if (enterBtn) {
  enterBtn.addEventListener("click", () => {
    // 🎧 MUSIC START
    music
      .play()
      .then(() => {
        isPlaying = true;
        toggle.innerText = "🎧";
      })
      .catch(() => {});

    // 🎬 START CINEMATIC
    document.body.classList.add("entering");

    if (overlay) {
      overlay.classList.add("active");
    }

    // 💥 FADE PRELOADER
    setTimeout(() => {
      preloader.style.opacity = "0";
    }, 300);

    // 🚀 TRIGGER REVEAL (fade in sequence)
    setTimeout(() => {
      document.body.classList.add("loaded");
    }, 900);

    // ⚡ GLITCH AFTER ALL ELEMENTS APPEAR
    setTimeout(() => {
      document.body.classList.add("glitch-start");
    }, 1600); // tunggu semua reveal selesai

    // 🔄 STOP GLITCH (biar gak ganggu UX)
    setTimeout(() => {
      document.body.classList.remove("glitch-start");
    }, 2200);
  });
}

/* =========================
   MUSIC TOGGLE
========================= */

if (toggle) {
  toggle.addEventListener("click", (e) => {
    e.stopPropagation();

    if (isPlaying) {
      music.pause();
      toggle.innerText = "🔇";
    } else {
      music.play();
      toggle.innerText = "🎧";
    }

    isPlaying = !isPlaying;
  });
}
