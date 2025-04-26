// SmoothScrolling.jsx
import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

const SmoothScrolling = () => {
  useEffect(() => {
    const lenis = new Lenis();

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
};

export default SmoothScrolling;
