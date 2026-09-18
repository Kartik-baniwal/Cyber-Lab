/* Pointer-driven depth: one animation frame per interaction, with an explicit teardown. */
export function initDimension(): () => void {
  const root = document.documentElement;
  const scene = document.querySelector('.dimension-scene') as HTMLElement | null;
  const toggle = document.getElementById('motion-toggle') as HTMLButtonElement | null;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const previousMotion = root.dataset.motion;
  const previousSceneSleep = scene?.classList.contains('scene-sleep') ?? false;
  const cardSelector = '.spatial-card, .tilt-card, .hero-stat-card, .feature-pill-card, .modern-lab-card';
  const decoratedCards: Element[] = [];
  let paused = false;
  let disposed = false;
  let frame = 0;
  let lastCard: HTMLElement | null = null;
  let pendingPointer: { target: Element; x: number; y: number } | null = null;
  const initialSceneBox = scene?.getBoundingClientRect();
  let sceneVisible = !!initialSceneBox && initialSceneBox.bottom > 0 && initialSceneBox.top < window.innerHeight;

  const resetCard = () => {
    if (!lastCard) return;
    lastCard.style.removeProperty('--tilt-x');
    lastCard.style.removeProperty('--tilt-y');
    lastCard.style.removeProperty('--shine-x');
    lastCard.style.removeProperty('--shine-y');
    lastCard = null;
  };

  const resetScene = () => {
    scene?.style.removeProperty('--scene-x');
    scene?.style.removeProperty('--scene-y');
  };

  const resetPointer = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    pendingPointer = null;
    resetCard();
    resetScene();
  };

  const isMotionPaused = () => paused || reduced.matches;
  const canTilt = () => !disposed && finePointer.matches && !isMotionPaused() && !document.hidden;
  const syncScene = () => {
    scene?.classList.toggle('scene-sleep', isMotionPaused() || document.hidden || !sceneVisible);
    if (!sceneVisible) resetScene();
  };

  function syncMotion() {
    root.dataset.motion = isMotionPaused() ? 'paused' : 'active';
    if (toggle) {
      toggle.setAttribute('aria-pressed', String(isMotionPaused()));
      toggle.setAttribute('aria-label', reduced.matches ? 'Reduced motion enabled in system settings' : paused ? 'Resume decorative motion' : 'Pause decorative motion');
      toggle.textContent = reduced.matches ? 'Reduced motion' : paused ? 'Resume motion' : 'Pause motion';
      toggle.disabled = reduced.matches;
    }
    if (!canTilt()) resetPointer();
    syncScene();
  }

  const clamp = (value: number) => Math.min(1, Math.max(0, value));
  const applyPointer = () => {
    frame = 0;
    const pointer = pendingPointer;
    pendingPointer = null;
    if (!canTilt() || !pointer || !pointer.target.isConnected) {
      resetPointer();
      return;
    }

    const { target, x, y } = pointer;
    const card = target.closest<HTMLElement>(cardSelector);
    if (card !== lastCard) resetCard();
    if (card) {
      const box = card.getBoundingClientRect();
      if (box.width > 0 && box.height > 0) {
        const dx = clamp((x - box.left) / box.width);
        const dy = clamp((y - box.top) / box.height);
        lastCard = card;
        card.style.setProperty('--tilt-x', `${(0.5 - dy) * 5}deg`);
        card.style.setProperty('--tilt-y', `${(dx - 0.5) * 5}deg`);
        card.style.setProperty('--shine-x', `${dx * 100}%`);
        card.style.setProperty('--shine-y', `${dy * 100}%`);
      }
    }
    if (scene && sceneVisible && scene.contains(target)) {
      const box = scene.getBoundingClientRect();
      if (box.width > 0 && box.height > 0) {
        scene.style.setProperty('--scene-y', `${(clamp((x - box.left) / box.width) - 0.5) * 10}deg`);
        scene.style.setProperty('--scene-x', `${(0.5 - clamp((y - box.top) / box.height)) * 8}deg`);
      }
    } else resetScene();
  };

  const onPointerMove = (event: PointerEvent) => {
    if (!canTilt() || event.pointerType === 'touch' || !(event.target instanceof Element)) {
      resetPointer();
      return;
    }
    pendingPointer = { target: event.target, x: event.clientX, y: event.clientY };
    if (!frame) frame = requestAnimationFrame(applyPointer);
  };
  const onToggle = () => {
    paused = !paused;
    syncMotion();
  };
  const onVisibilityChange = () => {
    resetPointer();
    syncScene();
  };
  const onPointerCapabilityChange = () => {
    resetPointer();
    syncMotion();
  };

  document.querySelectorAll('.feature-pill-card, .hero-stat-card, .modern-lab-card').forEach(card => {
    if (!card.classList.contains('spatial-card')) {
      card.classList.add('spatial-card');
      decoratedCards.push(card);
    }
  });

  const observer = scene && typeof IntersectionObserver !== 'undefined'
    ? new IntersectionObserver(entries => {
      if (disposed) return;
      sceneVisible = entries.some(entry => entry.target === scene && entry.isIntersecting);
      if (!sceneVisible) resetPointer();
      syncScene();
    })
    : null;
  if (scene) observer?.observe(scene);

  toggle?.addEventListener('click', onToggle);
  reduced.addEventListener('change', syncMotion);
  finePointer.addEventListener('change', onPointerCapabilityChange);
  document.addEventListener('pointermove', onPointerMove, { passive: true });
  document.addEventListener('visibilitychange', onVisibilityChange);
  document.addEventListener('scroll', resetPointer, { passive: true, capture: true });
  root.addEventListener('pointerleave', resetPointer);
  scene?.addEventListener('pointerleave', resetPointer);
  window.addEventListener('blur', resetPointer);
  syncMotion();

  return () => {
    if (disposed) return;
    disposed = true;
    resetPointer();
    observer?.disconnect();
    toggle?.removeEventListener('click', onToggle);
    reduced.removeEventListener('change', syncMotion);
    finePointer.removeEventListener('change', onPointerCapabilityChange);
    document.removeEventListener('pointermove', onPointerMove);
    document.removeEventListener('visibilitychange', onVisibilityChange);
    document.removeEventListener('scroll', resetPointer, true);
    root.removeEventListener('pointerleave', resetPointer);
    scene?.removeEventListener('pointerleave', resetPointer);
    window.removeEventListener('blur', resetPointer);
    decoratedCards.forEach(card => card.classList.remove('spatial-card'));
    scene?.classList.toggle('scene-sleep', previousSceneSleep);
    if (previousMotion === undefined) delete root.dataset.motion;
    else root.dataset.motion = previousMotion;
  };
}
