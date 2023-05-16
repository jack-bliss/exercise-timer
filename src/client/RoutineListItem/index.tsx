export function RoutineListItem({
  item,
  active = false,
}: {
  item: RoutineItem;
  active?: boolean;
}) {
  return (
    <span style={{ fontWeight: active ? 'bold' : 'normal' }}>
      {item.name}
      {': '}
      {item.type}
      {' for '}
      {item.reps.type === 'count' && <>{item.reps.count} reps</>}
      {item.reps.type === 'duration' && (
        <>
          {(item.reps.minutes || 0) * 60 + (item.reps.seconds || 0)}{' '}
          seconds
        </>
      )}
    </span>
  );
}
