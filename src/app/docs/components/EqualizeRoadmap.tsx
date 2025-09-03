"use client";

import { useEffect } from 'react';

export default function EqualizeRoadmap() {
  useEffect(() => {
    let ro: ResizeObserver | null = null;

    const equalize = () => {
      if (!window.matchMedia('(min-width: 880px)').matches) {
        // Reset any min-heights on mobile/single column
        document.querySelectorAll<HTMLElement>('.session .block').forEach((b) => {
          b.style.minHeight = '';
        });
        return;
      }

      document.querySelectorAll<HTMLElement>('.session').forEach((session, idx) => {
        // Initialize DOM structure once: wrap blocks into two columns
        if (!session.dataset.eqInit) {
          const directBlocks = session.querySelectorAll<HTMLElement>(':scope > .block');
          if (directBlocks.length >= 4) {
            const leftCol = document.createElement('div');
            leftCol.className = 'col-left';
            const rightCol = document.createElement('div');
            rightCol.className = 'col-right';

            // Insert columns after the heading/meta
            const anchor = session.querySelector(':scope h2') || session.firstChild;
            if (anchor && anchor.parentNode === session) {
              session.insertBefore(leftCol, (anchor as Element).nextSibling);
              session.insertBefore(rightCol, leftCol.nextSibling);
            } else {
              session.appendChild(leftCol);
              session.appendChild(rightCol);
            }

            // Move 1 & 3 to left; 2 & 4 to right
            const b = Array.from(directBlocks);
            [0, 2].forEach((i) => b[i] && leftCol.appendChild(b[i]));
            [1, 3].forEach((i) => b[i] && rightCol.appendChild(b[i]));

            session.dataset.eqInit = '1';
            session.classList.add('cols-ready');
          }
        }

        const leftCol = session.querySelector<HTMLElement>(':scope > .col-left');
        const rightCol = session.querySelector<HTMLElement>(':scope > .col-right');
        if (!leftCol || !rightCol) return;

        const leftBlocks = Array.from(leftCol.querySelectorAll<HTMLElement>(':scope > .block'));
        const rightBlocks = Array.from(rightCol.querySelectorAll<HTMLElement>(':scope > .block'));
        if (leftBlocks.length === 0 || rightBlocks.length === 0) return;

        // Reset before measuring
        [...leftBlocks, ...rightBlocks].forEach((b) => (b.style.minHeight = ''));

        const total = (els: HTMLElement[]) =>
          els.reduce((sum, el) => sum + el.getBoundingClientRect().height, 0);

        const lh = total(leftBlocks);
        const rh = total(rightBlocks);
        const diff = Math.abs(lh - rh);
        if (diff < 1) return;

        const shorter = lh < rh ? leftBlocks : rightBlocks;

        // Deterministic, slightly varying split ratio per session (0.55–0.75)
        const ratio = 0.55 + ((idx * 13) % 20) / 100; // pseudo variation per session
        const topAdd = diff * ratio;
        const bottomAdd = diff - topAdd;

        if (shorter[0]) {
          const h0 = shorter[0].getBoundingClientRect().height;
          shorter[0].style.minHeight = `${h0 + topAdd}px`;
        }
        if (shorter[1]) {
          const h1 = shorter[1].getBoundingClientRect().height;
          shorter[1].style.minHeight = `${h1 + bottomAdd}px`;
        }
      });
    };

    // Run after hydration
    const onLoad = () => requestAnimationFrame(equalize);
    window.addEventListener('load', onLoad);
    window.addEventListener('resize', equalize);

    // Observe layout/content changes
    ro = new ResizeObserver(() => equalize());
    ro.observe(document.body);

    // Initial run
    onLoad();

    return () => {
      window.removeEventListener('load', onLoad);
      window.removeEventListener('resize', equalize);
      if (ro) ro.disconnect();
    };
  }, []);

  return null;
}
