/* ════════════════════════════════════════════════
   TAMALITO DE POLLO Y ANIS — main.js
════════════════════════════════════════════════ */

gsap.registerPlugin(TextPlugin);

/* ─── CONFIG ─── */
const CONFIG = {
  password: "14/07/2006",

  momentos: [
    {
      emoji: "🧽",
      texto:
        "La vez que salimos y te dejé en tu casa... nos despedimos con una foto de Bob y Patricio juntos.",
      caption: "Bob & Patricio",
    },
    {
      emoji: "🌙",
      texto:
        "La vez que salimos hasta muy tarde y nos la pasamos caminando por todos lados.",
      caption: "Como no nos cansamos?",
    },
    {
      emoji: "🔮",
      texto:
        "La feria holística. Nos leyeron el tarot y creo que se nos están cumpliendo varias cosas.",
      caption: "El tarot (o la luna) lo sabía todo",
    },
    {
      emoji: "🎬",
      texto:
        "El día que fuimos al cine y vimos dos pelis seguidas. No dabas más pero fue got",
      caption: "Dos pelis de las GOTT",
    },
    {
      emoji: "🖼️",
      texto:
        "El museo. Sacamos fotos muy gott y creo que éramos los únicos que se reían solitos DLSAKDJA.",
      caption: "Arte y DESASTRE",
    },
    {
      emoji: "🥢",
      texto:
        "Arenales: makis, play, el parque de tu casa... y el tatuaje de araña que me hiciste en la mano.",
      caption: "La araña sigue tatuada pero en mi mente",
    },
    {
      emoji: "💬",
      texto:
        "El día que te conté muchas cosas y quería decirte para ser mejores amigos. No se pudo por tiempo, pero no dejaba de pensarlo.",
      caption: "Lo que no se dijo ese día",
    },
    {
      emoji: "🌧️",
      texto:
        "La cajita feliz, el día entero paseando, la lluvia, el soju... y antes de dejarte en casa, aceptaste ser mi mejor amiga.",
      caption: "El soju selló el trato (pacto satánico)",
    },
  ],

  tarjetas: [
    {
      emoji: "🦦",
      label: "Nutria",
      msg: "Tu animal favorito. Con suerte este año nos perdemos en algún zoo",
    },
    {
      emoji: "☕",
      label: "Café",
      msg: "Sé que te encanta el café pero la próxima no me eches más azucar que café NJIBVYCTDIBUGVY",
    },
    {
      emoji: "📷",
      label: "Fotografía",
      msg: "Estudias fotografía y se nota demasiado, ves las cosas diferente a los demás. Signos? ClarOscuro? Semiótica? ",
    },
    {
      emoji: "🌊",
      label: "Playa",
      msg: "Verano, arena y mar. Por algo te traje aquí.",
    },
    {
      emoji: "🍩",
      label: "Dunkin",
      msg: "Donde todo empezó. Ya no voy al pvea, directamente me voy a tu módulo LAKSDALDJ.",
    },
    {
      emoji: "🐶",
      label: "Perro salchicha",
      msg: "Aunque me dan risa sus patitas cortas, son bien lindos y orejones como mi Danna LDKAJDLJ",
    },
    {
      emoji: "🎵",
      label: "Humbe",
      msg: "Tu Humberto, el primer artista que me hiciste escuchar. (Literalmente ahora mismo lo estás escuchando)",
    },
    {
      emoji: "♋",
      label: "Cáncer",
      msg: "Según la astrología somos muy compatibles, ahora entiendo como entramos en confianza tan rápido xd",
    },
  ],

  mensajeFinal: `Hace unos meses no sabía que un llavero de Bob Esponja me iba a dar a la mejor persona del año.

Desde el plaza vea hasta aquí. No sé cómo explicarlo pero apareciste en el momento exacto en que más lo necesitaba.

En este corto tiempo, me enseñaste que la amistad también puede llegar de golpe, sin avisar, y quedarse para siempre.

A veces siento que hay personas que llegan a tu vida sin hacer ruido y de repente ya no imaginas el día sin hablar con ellas.

Tú eres una de esas.

Gracias por las charlitas, las caminatas y todo lo que falta por vivir. Con suerte te estaré abrazando en este momento, y sino, solo levanta los ojos y mírame.`,
};

/* ─── ESTADO ─── */
const state = {
  currentScreen: 'password',
  momentoActual: 0,
  fotosCapturadas: [],
};

/* ─── AUDIO ─── */
const audioVegas = document.getElementById('audio-vegas');

function startAudio() {
  if (!audioVegas) return;
  audioVegas.volume = 0;
  audioVegas.play().catch(() => {});
  fadeAudio(audioVegas, 0, 0.45, 3000);
}

function fadeAudio(el, from, to, duration, cb) {
  if (!el) return;
  const steps = 40, stepTime = duration / steps, delta = (to - from) / steps;
  let cur = from;
  el.volume = Math.max(0, Math.min(1, cur));
  const iv = setInterval(() => {
    cur += delta;
    el.volume = Math.max(0, Math.min(1, cur));
    if ((delta > 0 && cur >= to) || (delta < 0 && cur <= to)) {
      el.volume = Math.max(0, Math.min(1, to));
      clearInterval(iv);
      if (cb) cb();
    }
  }, stepTime);
}

/* ─── NAVEGACIÓN ─── */
function showScreen(id, animIn) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = document.getElementById('screen-' + id);
  if (!el) return;
  state.currentScreen = id;
  el.classList.add('active');
  if (animIn) animIn(el);
}

function blackTransition(cb) {
  const overlay = document.getElementById('black-overlay');
  gsap.to(overlay, { opacity: 1, duration: 0.9, onComplete: () => {
    cb();
    gsap.to(overlay, { opacity: 0, duration: 1.1, delay: 0.4 });
  }});
}

/* ─── BURBUJAS DE FONDO ─── */
function initBurbujas() {
  setInterval(() => {
    const b = document.createElement('div');
    b.className = 'burbuja';
    const size = Math.random() * 30 + 8;
    b.style.width = size + 'px';
    b.style.height = size + 'px';
    b.style.left = Math.random() * 100 + 'vw';
    b.style.bottom = '-50px';
    b.style.animationDuration = (Math.random() * 8 + 6) + 's';
    b.style.animationDelay = Math.random() * 2 + 's';
    document.body.appendChild(b);
    setTimeout(() => b.remove(), 16000);
  }, 1200);
}

/* ─── ESTRELLAS DE FONDO ─── */
function initStars() {
  const canvas = document.getElementById('stars-bg');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  let stars = [];
  function initStarData() {
    stars = [];
    for (let i = 0; i < 120; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.2 + .2,
        alpha: Math.random() * .5 + .1,
        delta: (Math.random() * .004 + .001) * (Math.random() > .5 ? 1 : -1),
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => {
      s.alpha += s.delta;
      if (s.alpha <= .05 || s.alpha >= .65) s.delta *= -1;
      ctx.save();
      ctx.globalAlpha = Math.max(0, Math.min(1, s.alpha));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = '#b8e4f0';
      ctx.fill();
      ctx.restore();
    });
    requestAnimationFrame(draw);
  }

  resize();
  initStarData();
  draw();
  window.addEventListener('resize', () => { resize(); initStarData(); });
}

/* ════════════════════════════════
   SCREEN 1 — CONTRASEÑA
════════════════════════════════ */
function initPassword() {
  const hint  = document.querySelector('.pw-hint');
  const sub   = document.querySelector('.pw-sub');
  const input = document.getElementById('pw-input');
  const err   = document.getElementById('pw-error');
  const btn   = document.getElementById('pw-btn');

  gsap.fromTo(hint, { opacity:0, y:20 }, { opacity:1, y:0, duration:1.5, delay:.5, ease:'power2.out' });
  gsap.fromTo(sub,  { opacity:0 },       { opacity:1,      duration:1,   delay:1.2 });

  input.addEventListener('input', () => {
    let v = input.value.replace(/\D/g,'');
    if (v.length > 4)      v = v.slice(0,2)+'/'+v.slice(2,4)+'/'+v.slice(4,8);
    else if (v.length > 2) v = v.slice(0,2)+'/'+v.slice(2);
    input.value = v;
  });

  const tryPw = () => {
    if (input.value === CONFIG.password) {
      gsap.to('#screen-password', { opacity:0, duration:.8, onComplete: () => {
        startAudio();
        document.getElementById('gradBg').style.animationPlayState = 'running';
        blackTransition(() => showScreen('historia', animHistoria));
      }});
    } else {
      input.classList.add('error');
      err.classList.add('show');
      setTimeout(() => { input.classList.remove('error'); err.classList.remove('show'); }, 2200);
    }
  };

  btn.addEventListener('click', tryPw);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') tryPw(); });
}

/* ════════════════════════════════
   SCREEN 2 — HISTORIA
════════════════════════════════ */
function animHistoria(el) {
  gsap.to(el, { opacity:1, duration:.5 });

  const titulo = el.querySelector('.historia-titulo');
  const sub    = el.querySelector('.historia-sub');
  const items  = el.querySelectorAll('.timeline-item');
  const btn    = el.querySelector('.timeline-btn');

  gsap.fromTo(titulo, { opacity:0, y:20 }, { opacity:1, y:0, duration:1, delay:.3 });
  gsap.fromTo(sub,    { opacity:0 },       { opacity:1,      duration:.8, delay:.7 });

  items.forEach((item, i) => {
    gsap.fromTo(item,
      { opacity:0, x:-20 },
      { opacity:1, x:0, duration:.7, delay: 1 + i * .35, ease:'power2.out' }
    );
  });

  gsap.fromTo(btn, { opacity:0 }, { opacity:1, duration:.8, delay: 1 + items.length * .35 + .5 });

  btn.addEventListener('click', () => {
    blackTransition(() => showScreen('universo', animUniverso));
  }, { once: true });
}

/* ════════════════════════════════
   SCREEN 3 — UNIVERSO
════════════════════════════════ */
function animUniverso(el) {
  gsap.to(el, { opacity:1, duration:.5 });

  const titulo  = el.querySelector('.universo-titulo');
  const sub     = el.querySelector('.universo-sub');
  const tarjetas = el.querySelectorAll('.tarjeta');
  const btn     = el.querySelector('.universo-btn');

  gsap.fromTo(titulo, { opacity:0, y:15 }, { opacity:1, y:0, duration:.9, delay:.3 });
  gsap.fromTo(sub,    { opacity:0 },       { opacity:1,      duration:.7, delay:.6 });

  tarjetas.forEach((t, i) => {
    gsap.fromTo(t,
      { opacity:0, scale:.85 },
      { opacity:1, scale:1, duration:.6, delay: .8 + i * .1, ease:'back.out(1.4)' }
    );
    t.addEventListener('click', () => {
      if (t.classList.contains('abierta')) {
        t.classList.remove('abierta');
      } else {
        document.querySelectorAll('.tarjeta.abierta').forEach(x => x.classList.remove('abierta'));
        t.classList.add('abierta');
      }
    });
  });

  gsap.fromTo(btn, { opacity:0 }, { opacity:1, duration:.8, delay: .8 + tarjetas.length * .1 + .5 });

  btn.addEventListener('click', () => {
    blackTransition(() => showScreen('juego', animJuego));
  }, { once: true });
}

/* ════════════════════════════════
   SCREEN 4 — JUEGO DE FOTOS
════════════════════════════════ */
function animJuego(el) {
  gsap.to(el, { opacity:1, duration:.5 });

  const titulo  = el.querySelector('.juego-titulo');
  const sub     = el.querySelector('.juego-sub');
  const camara  = el.querySelector('.camara-wrapper');

  gsap.fromTo(titulo, { opacity:0, y:15 }, { opacity:1, y:0, duration:.9, delay:.3 });
  gsap.fromTo(sub,    { opacity:0 },       { opacity:1,      duration:.7, delay:.6 });
  gsap.fromTo(camara, { opacity:0, scale:.9 }, { opacity:1, scale:1, duration:.8, delay:.9, ease:'back.out(1.2)' });

  mostrarMomento(0);

  const visor   = el.querySelector('.camara-visor');
  const shutter = el.querySelector('.camara-shutter');

  const tomarFoto = () => {
    if (state.momentoActual >= CONFIG.momentos.length) return;

    const flash = el.querySelector('.visor-flash');
    gsap.to(flash, { opacity:1, duration:.08, onComplete: () => {
      gsap.to(flash, { opacity:0, duration:.25 });
    }});

    state.fotosCapturadas.push(CONFIG.momentos[state.momentoActual]);
    actualizarContador();

    state.momentoActual++;

    if (state.momentoActual < CONFIG.momentos.length) {
      gsap.to([el.querySelector('.visor-momento-emoji'), el.querySelector('.visor-momento-texto')], {
        opacity:0, y:-10, duration:.3, onComplete: () => mostrarMomento(state.momentoActual)
      });
    } else {
      gsap.to(visor, { opacity:0, duration:.5, delay:.3, onComplete: () => {
        blackTransition(() => showScreen('album', animAlbum));
      }});
    }
  };

  visor.addEventListener('click', tomarFoto);
  shutter.addEventListener('click', e => { e.stopPropagation(); tomarFoto(); });
}

function mostrarMomento(idx) {
  const emoji = document.querySelector('.visor-momento-emoji');
  const texto = document.querySelector('.visor-momento-texto');
  if (!emoji || !texto) return;
  const m = CONFIG.momentos[idx];
  emoji.textContent = m.emoji;
  texto.textContent = m.texto;
  gsap.fromTo([emoji, texto], { opacity:0, y:10 }, { opacity:1, y:0, duration:.4, stagger:.1 });
}

function actualizarContador() {
  const el = document.querySelector('.camara-contador-fotos');
  if (el) el.textContent = `${state.fotosCapturadas.length} / ${CONFIG.momentos.length}`;
}

/* ════════════════════════════════
   SCREEN 5 — ÁLBUM
════════════════════════════════ */
function animAlbum(el) {
  gsap.to(el, { opacity:1, duration:.5 });

  const titulo = el.querySelector('.album-titulo');
  const sub    = el.querySelector('.album-sub');
  const grid   = el.querySelector('.polaroids-grid');
  const msg    = el.querySelector('.mensaje-final');

  gsap.fromTo(titulo, { opacity:0, y:15 }, { opacity:1, y:0, duration:.9, delay:.3 });
  gsap.fromTo(sub,    { opacity:0 },       { opacity:1,      duration:.7, delay:.6 });

  // Generar polaroids de las fotos capturadas
  grid.innerHTML = '';

  const fotosReales = [
    { src: 'fotos/foto1.jpg', caption: 'Tú bien chiquita (hace unos años xd)' },
    { src: 'fotos/foto2.jpg', caption: 'FotoPatricio' },
    { src: 'fotos/foto3.jpg', caption: 'Bob Y Patricio' },
  ];

  fotosReales.forEach((f, i) => {
    const p = document.createElement('div');
    p.className = 'polaroid';
    p.style.transform = `rotate(${(Math.random()-0.5)*6}deg)`;
    p.innerHTML = `
      <img class="polaroid-img" src="${f.src}" alt="foto" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" style="display:block;width:100%;aspect-ratio:1;object-fit:cover;border-radius:2px;">
      <div class="polaroid-img" style="display:none;font-size:2.5rem;align-items:center;justify-content:center;">📷</div>
      <div class="polaroid-caption">${f.caption}</div>
    `;
    grid.appendChild(p);
    gsap.fromTo(p, { opacity:0, y:30, rotate: parseFloat(p.style.transform.replace(/[^-\d.]/g,'')) - 5 },
      { opacity:1, y:0, duration:.7, delay:.8 + i*.2, ease:'back.out(1.2)' });
  });

  // Polaroids de los momentos capturados en el juego
  state.fotosCapturadas.forEach((f, i) => {
    const p = document.createElement('div');
    p.className = 'polaroid';
    p.style.transform = `rotate(${(Math.random()-0.5)*6}deg)`;
    p.innerHTML = `
      <div class="polaroid-img" style="font-size:2.5rem;display:flex;align-items:center;justify-content:center;">${f.emoji}</div>
      <div class="polaroid-caption">${f.caption}</div>
    `;
    grid.appendChild(p);
    gsap.fromTo(p, { opacity:0, y:30 },
      { opacity:1, y:0, duration:.7, delay:.8 + (fotosReales.length + i)*.15, ease:'back.out(1.2)' });
  });

  // Mensaje final
  setTimeout(() => {
    gsap.fromTo(msg, { opacity:0, y:20 }, { opacity:1, y:0, duration:1.2, ease:'power2.out' });
  }, (.8 + (fotosReales.length + state.fotosCapturadas.length) * .15 + .5) * 1000);
}

/* ════════════════════════════════
   INIT
════════════════════════════════ */
window.addEventListener('DOMContentLoaded', () => {
  initStars();
  initBurbujas();
  setTimeout(() => {
    document.getElementById('gradBg').style.animationPlayState = 'running';
  }, 500);
  showScreen('password', initPassword);
});
