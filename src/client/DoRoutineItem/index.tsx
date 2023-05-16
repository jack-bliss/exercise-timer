import { CountItem } from './CountItem';
import { DurationItem } from './DurationItem';

type DoRoutineItemProps = {
  item: RoutineItem;
  onComplete: () => void;
};

function isCountItem(item: RoutineItem): item is CountRoutineItem {
  return item.reps.type === 'count';
}

function isDurationItem(item: RoutineItem): item is DurationRoutineItem {
  return item.reps.type === 'duration';
}

export function DoRoutineItem({ item, onComplete }: DoRoutineItemProps) {
  if (isCountItem(item)) {
    return (
      <CountItem
        item={item}
        onComplete={onComplete}
      />
    );
  }
  if (isDurationItem(item)) {
    return (
      <DurationItem
        item={item}
        onComplete={onComplete}
      />
    );
  }
  return <p>Unknown item {JSON.stringify(item)}</p>;
}
