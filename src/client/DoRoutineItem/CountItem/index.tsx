export function CountItem({
  item,
  onComplete,
}: {
  item: CountRoutineItem;
  onComplete: () => void;
}) {
  return (
    <button
      className="count-item"
      style={{
        '--count-item-background': {
          stretch: 'var(--stretch)',
          exercise: 'var(--exercise)',
        }[item.type],
      }}
      onClick={onComplete}
    >
      <span className="info">
        {item.name}: {item.reps.count} reps
      </span>
      <span className="done">Done</span>
    </button>
  );
}
