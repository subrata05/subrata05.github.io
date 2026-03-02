// Timestamp
function updateTimestamp() {
  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  document.getElementById('timestamp').textContent = timeStr;
}

updateTimestamp();
setInterval(updateTimestamp, 1000);

// Glitter effect - reduced on mobile
const glitterContainer = document.getElementById('glitterContainer');
let lastX = 0;
let lastY = 0;
let isHoveringCard = false;
let isTouch = window.matchMedia('(pointer: coarse)').matches;

const card = document.querySelector('.card');
card.addEventListener('mouseenter', () => isHoveringCard = true);
card.addEventListener('mouseleave', () => isHoveringCard = false);

// Touch events for mobile
card.addEventListener('touchstart', () => isHoveringCard = true, {passive: true});
card.addEventListener('touchend', () => isHoveringCard = false, {passive: true});

document.addEventListener('mousemove', (e) => {
  if (isTouch) return; // Skip mouse glitter on touch devices
  
  const distance = Math.hypot(e.clientX - lastX, e.clientY - lastY);
  const threshold = isHoveringCard ? 8 : 15;
  const count = isHoveringCard ? 2 : 1;
  
  if (distance < threshold) return;
  
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      createGlitter(e.clientX, e.clientY, isHoveringCard);
    }, i * 40);
  }
  
  lastX = e.clientX;
  lastY = e.clientY;
});

// Touch glitter - single burst on move
document.addEventListener('touchmove', (e) => {
  const touch = e.touches[0];
  const distance = Math.hypot(touch.clientX - lastX, touch.clientY - lastY);
  
  if (distance > 40) {
    createGlitter(touch.clientX, touch.clientY, true);
    lastX = touch.clientX;
    lastY = touch.clientY;
  }
}, {passive: true});

function createGlitter(x, y, intense) {
  // Limit total glitter on mobile
  if (isTouch && document.querySelectorAll('.glitter').length > 15) return;
  
  const glitter = document.createElement('div');
  glitter.className = 'glitter';
  
  const isLarge = Math.random() > (intense ? 0.7 : 0.9);
  
  const spread = intense ? 50 : 30;
  const offsetX = (Math.random() - 0.5) * spread;
  const offsetY = (Math.random() - 0.5) * spread;
  
  if (isLarge) glitter.classList.add('large');
  
  glitter.style.left = `${x + offsetX}px`;
  glitter.style.top = `${y + offsetY}px`;
  
  glitterContainer.appendChild(glitter);
  
  setTimeout(() => glitter.remove(), 1000);
}

// Click/tap burst
document.addEventListener('click', (e) => {
  createBurst(e.clientX, e.clientY);
});

function createBurst(x, y) {
  const burst = document.createElement('div');
  burst.className = 'sparkle-burst';
  burst.style.left = x + 'px';
  burst.style.top = y + 'px';
  
  const colors = ['#06b6d4', '#3b82f6', '#f59e0b', '#fff'];
  const count = isTouch ? 8 : 15; // Fewer on mobile
  
  for (let i = 0; i < count; i++) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    
    const angle = (i / count) * Math.PI * 2;
    const distance = 50 + Math.random() * 30;
    const tx = Math.cos(angle) * distance + 'px';
    const ty = Math.sin(angle) * distance + 'px';
    
    sparkle.style.setProperty('--tx', tx);
    sparkle.style.setProperty('--ty', ty);
    sparkle.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    burst.appendChild(sparkle);
  }
  
  glitterContainer.appendChild(burst);
  setTimeout(() => burst.remove(), 600);
}

// Ambient sparkles - disabled on mobile for battery
if (!isTouch) {
  setInterval(() => {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    createGlitter(x, y, false);
  }, 3000);
}