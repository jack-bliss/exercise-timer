import { useState, useRef } from 'preact/hooks';

export function useTimer(fps: number) {
  const [remaining, setRemaining] = useState(0);

  const lastUpdated = useRef<number>(0);
  const timerRef = useRef<number>();
  const isPaused = useRef<boolean>(false);

  return [
    remaining,
    {
      start: (target: number, onComplete: () => void) => {
        isPaused.current = false;
        setRemaining(target);
        lastUpdated.current = Date.now();
        timerRef.current = window.setInterval(() => {
          if (isPaused.current) {
            return;
          }
          const now = Date.now();
          const elapsed = now - lastUpdated.current;
          setRemaining((prev) => {
            const next = prev - elapsed;
            if (next < 0) {
              onComplete();
              return 0;
            }
            return next;
          });
          lastUpdated.current = now;
        }, 1000 / fps);
      },
      stop: () => {
        clearInterval(timerRef.current);
      },
      pause: () => {
        isPaused.current = true;
      },
      resume: () => {
        isPaused.current = false;
      },
    },
  ] as const;
}
