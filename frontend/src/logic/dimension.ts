/* Small, event-driven spatial interactions. No continuous JavaScript render loop. */
export function initDimension() {
  const root = document.documentElement;
  const scene = document.querySelector('.dimension-scene') as HTMLElement | null;
  const toggle = document.getElementById('motion-toggle') as HTMLButtonElement | null;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  let paused = reduced.matches;
  let frame = 0;
  let lastCard: HTMLElement | null = null;
  
  function syncMotion() {
    root.dataset.motion = paused || reduced.matches ? 'paused' : 'active';
    if (toggle) {
      toggle.setAttribute('aria-pressed', String(paused || reduced.matches));
      toggle.textContent = reduced.matches ? 'Reduced motion' : paused ? 'Resume motion ▷' : 'Pause motion Ⅱ';
      toggle.disabled = reduced.matches;
    }
  }
  
  syncMotion();
  if (toggle) toggle.addEventListener('click', () => { paused = !paused; syncMotion(); });
  reduced.addEventListener('change', () => { paused = reduced.matches; syncMotion(); });
  
  const resetCard = () => {
    if (!lastCard) return;
    lastCard.style.removeProperty('--tilt-x');
    lastCard.style.removeProperty('--tilt-y');
    lastCard = null;
  };
  
  document.querySelectorAll('.feature-pill-card, .hero-stat-card').forEach(el => el.classList.add('spatial-card'));
  
  document.addEventListener('pointermove', event => {
    if (!finePointer.matches || paused || reduced.matches) return;
    cancelAnimationFrame(frame);
    const target = event.target as HTMLElement | null;
    const x = event.clientX, y = event.clientY;
    
    frame = requestAnimationFrame(() => {
      const card = target ? target.closest('.tilt-card, .spatial-card') as HTMLElement | null : null;
      if (card !== lastCard) resetCard();
      if (card) {
        lastCard = card;
        const box = card.getBoundingClientRect();
        const dx = (x - box.left) / box.width, dy = (y - box.top) / box.height;
        card.style.setProperty('--tilt-x', `${(0.5 - dy) * 7}deg`);
        card.style.setProperty('--tilt-y', `${(dx - 0.5) * 7}deg`);
        card.style.setProperty('--shine-x', `${dx * 100}%`);
        card.style.setProperty('--shine-y', `${dy * 100}%`);
      }
      if (scene && target && scene.contains(target)) {
        const box = scene.getBoundingClientRect();
        scene.style.setProperty('--scene-y', `${((x - box.left) / box.width - 0.5) * 14}deg`);
        scene.style.setProperty('--scene-x', `${(0.5 - (y - box.top) / box.height) * 10}deg`);
      }
    });
  }, { passive: true });
  
  if (scene) {
    scene.addEventListener('pointerleave', () => {
      scene.style.setProperty('--scene-x', '0deg');
      scene.style.setProperty('--scene-y', '0deg');
    });
  }
  
  document.documentElement.addEventListener('pointerleave', () => { cancelAnimationFrame(frame); resetCard(); });
  
  if (scene) {
    const observer = new IntersectionObserver(entries => {
      scene.classList.toggle('scene-sleep', !entries[0].isIntersecting);
    });
    observer.observe(scene);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) { scene.classList.add('scene-sleep'); cancelAnimationFrame(frame); }
      else { observer.unobserve(scene); observer.observe(scene); }
    });
  }
}
