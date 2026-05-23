// 🦭💕 Carta para Lolita — by Lokito

const btnAbrir = document.getElementById('btn-abrir');
const introOverlay = document.getElementById('intro-overlay');
const mainCard = document.getElementById('main-card');
const btnMusica = document.getElementById('btn-musica');
const musicIcon = document.getElementById('music-icon');
const audio = document.getElementById('musica-fondo');

// ── ABRIR CARTA ──────────────────────────────────────
btnAbrir.addEventListener('click', () => {
    // Intentar reproducir música
    audio.volume = 0.5;
    audio.play().catch(() => {
        // Si el navegador bloquea, el botón flotante lo maneja
    });

    // Fade out intro
    introOverlay.classList.add('fade-out');

    setTimeout(() => {
        introOverlay.style.display = 'none';

        // Mostrar carta
        mainCard.classList.remove('hidden-card');

        // Mostrar botón música
        btnMusica.classList.remove('hidden');

        // Actualizar ícono música
        updateMusicIcon();

        // Trigger reveal inicial
        checkReveal();

    }, 1200);
});

// ── MÚSICA ───────────────────────────────────────────
btnMusica.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
    updateMusicIcon();
});

function updateMusicIcon() {
    if (audio.paused) {
        musicIcon.textContent = '🎵';
        btnMusica.classList.remove('playing');
    } else {
        musicIcon.textContent = '🎵';
        btnMusica.classList.add('playing');
    }
}

audio.addEventListener('play', updateMusicIcon);
audio.addEventListener('pause', updateMusicIcon);

// ── SCROLL REVEAL ────────────────────────────────────
function checkReveal() {
    const reveals = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;

    reveals.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < windowHeight * 0.88) {
            el.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', checkReveal);

// ── PARALLAX SUAVE EN STICKERS ────────────────────────
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            const scrollY = window.scrollY;
            const stickers = document.querySelectorAll('.sticker');

            stickers.forEach((s, i) => {
                const speed = 0.05 + (i % 3) * 0.03;
                const dir = i % 2 === 0 ? 1 : -1;
                s.style.transform = `translateY(${scrollY * speed * dir}px)`;
            });

            ticking = false;
        });
        ticking = true;
    }
});

// ── HOVER POLAROIDS SONIDO SUTIL ────────────────────
// (efecto visual ya está en CSS)

// ── CONFETI DE FOCAS AL LLEGAR AL FINAL ─────────────
let confettiDone = false;

function checkFinal() {
    const footer = document.querySelector('.carta-footer');
    if (!footer || confettiDone) return;

    const rect = footer.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
        confettiDone = true;
        lanzarConfetti();
    }
}

window.addEventListener('scroll', checkFinal);

function lanzarConfetti() {
    const emojis = ['🦭', '💕', '⭐', '✨', '💫', '🖤', '🎂'];
    const container = document.body;

    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const el = document.createElement('div');
            el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            el.style.cssText = `
                position: fixed;
                top: -40px;
                left: ${Math.random() * 100}vw;
                font-size: ${0.8 + Math.random() * 1.2}rem;
                z-index: 9999;
                pointer-events: none;
                animation: caer ${2 + Math.random() * 2}s ease-in forwards;
                opacity: 0.9;
            `;
            container.appendChild(el);
            setTimeout(() => el.remove(), 4000);
        }, i * 100);
    }
}

// Keyframe de caída inyectado dinámicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes caer {
        0%   { transform: translateY(0) rotate(0deg);   opacity: 1; }
        100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
    }
`;
document.head.appendChild(style);

// ── INIT ─────────────────────────────────────────────
// Pequeño pulso en el botón de intro para llamar la atención
setTimeout(() => {
    const btn = document.getElementById('btn-abrir');
    if (btn) {
        btn.style.animation = 'pulsarBtn 1.5s ease-in-out infinite';
    }
}, 500);

const styleBtn = document.createElement('style');
styleBtn.textContent = `
    @keyframes pulsarBtn {
        0%, 100% { box-shadow: 0 12px 30px rgba(196,85,109,0.35), 0 0 0 4px rgba(232,114,138,0.15); }
        50%       { box-shadow: 0 16px 40px rgba(196,85,109,0.5),  0 0 0 10px rgba(232,114,138,0.08); }
    }
`;
document.head.appendChild(styleBtn);
