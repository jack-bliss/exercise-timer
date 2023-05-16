import { useEffect } from 'preact/hooks';
import { useTimer } from '../../Routine/use-timer';

export function DurationItem({
  item,
  onComplete,
}: {
  item: DurationRoutineItem;
  onComplete: () => void;
}) {
  const [remaining, { start, stop }] = useTimer(10);
  useEffect(() => {
    start((item.reps.seconds || 0) * 1000, () => {
      const beep = new Audio('/beep.wav');
      beep.play();
      onComplete();
    });
    return stop;
  }, []);
  return (
    <div
      className="duration-item"
      style={{
        '--duration-item-background': {
          stretch: 'var(--stretch)',
          rest: 'var(--rest)',
          exercise: 'var(--exercise)',
        }[item.type],
      }}
    >
      {item.name} for {Math.ceil(remaining / 1000)} seconds
    </div>
  );
}
