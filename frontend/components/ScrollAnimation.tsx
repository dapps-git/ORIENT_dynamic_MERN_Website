'use client';
import { useEffect } from 'react';

export default function ScrollAnimation() {
  useEffect(() => {
    // Check if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            // Unobserve after revealing to prevent repeated triggering
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const selector = [
      '.scroll-reveal',
      '.capability-card',
      '.sector-card-box',
      '.cat-slider-card',
      '.why-card',
      '.testi-card',
      '.blog-card',
      '.rental-image-wrap',
      '.rental-content',
      '.trust-content-box',
      '.about-theme-grid > div',
      '.why-choose-left',
    ].join(', ');

    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}
