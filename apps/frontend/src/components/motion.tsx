import { useEffect } from 'react';

const revealSelector = [
  '.hero__eyebrow',
  '.hero h1',
  '.hero__summary',
  '.hero__tags',
  '.hero__actions',
  '.home-section > .section-intro',
  '.contact-section > .section-intro',
  '.impact-strip__item',
  '.capability-card',
  '.work-card',
  '.career-card',
  '.approach-card',
  '.expertise-card',
  '.about-copy',
  '.contact-section',
  '.case-study__hero',
  '.case-study__section',
  '.case-study__results',
  '.case-study__navigation',
  '.cv-page__hero',
  '.cv-page__section',
  '.not-found-page__visual',
  '.not-found-page__content',
].join(', ');

function markVisible(element: HTMLElement) {
  element.dataset.revealState = 'visible';
}

export function initializeMotion() {
  if (typeof document === 'undefined' || typeof window === 'undefined') return;

  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.dataset.motion = reduceMotion ? 'reduced' : 'ready';
}

export function useMotionReveal() {
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>(revealSelector));

    if (document.documentElement.dataset.motion !== 'ready') {
      targets.forEach(markVisible);
      return;
    }

    if (!('IntersectionObserver' in window)) {
      targets.forEach(markVisible);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          markVisible(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.01 },
    );

    targets.forEach((target) => {
      if (target.dataset.revealState !== 'visible') observer.observe(target);
    });

    return () => observer.disconnect();
  }, []);
}

export function useScrollProgress(enabled: boolean) {
  useEffect(() => {
    if (!enabled || document.documentElement.dataset.motion === 'reduced') return;

    let frameId: number | undefined;

    const updateProgress = () => {
      frameId = undefined;
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
      document.documentElement.style.setProperty('--scroll-progress', String(progress));
    };

    const scheduleUpdate = () => {
      if (frameId !== undefined) return;
      frameId = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);

    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      if (frameId !== undefined) window.cancelAnimationFrame(frameId);
    };
  }, [enabled]);
}
