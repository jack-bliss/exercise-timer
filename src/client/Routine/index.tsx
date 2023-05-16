import { DoRoutineItem } from '../DoRoutineItem';
import { RoutineListItem } from '../RoutineListItem';
import { PlayRoutineState, usePlayRoutine } from './use-play-routine';

type RoutineProps = {
  routine: Routine;
};

function getNextItem(
  routine: Routine,
  state: PlayRoutineState,
): { hasNext: false } | { hasNext: true; item: RoutineItem } {
  if (state.type === 'not-started') {
    return { hasNext: true, item: routine.items[0] };
  }
  if (state.type === 'complete') {
    return { hasNext: false };
  }
  const itemIndex = routine.items.findIndex(
    ({ id }) => id === state.item.id,
  );
  if (itemIndex === routine.items.length - 1) {
    return { hasNext: false };
  }
  return { hasNext: true, item: routine.items[itemIndex + 1] };
}

export function Routine({ routine }: RoutineProps) {
  const [state, { item, complete, restart }] = usePlayRoutine();
  const nextItem = getNextItem(routine, state);
  return (
    <div
      id="routine-wrapper"
      className={state.type}
    >
      <h3>{routine.name}</h3>

      {state.type === 'not-started' && (
        <div className="not-started">
          <p>
            <button
              className="big-button"
              onClick={() => item(routine.items[0])}
            >
              Start
            </button>
          </p>
          <ol>
            {routine.items.map((item) => (
              <li key={item.id}>
                <RoutineListItem item={item} />
              </li>
            ))}
          </ol>
        </div>
      )}
      {state.type === 'item' && (
        <>
          <DoRoutineItem
            key={state.item.id}
            item={state.item}
            onComplete={() => {
              if (!nextItem.hasNext) {
                complete();
                return;
              }
              item(nextItem.item);
            }}
          />
          <div className="up-next">
            {nextItem.hasNext ? (
              <>
                Up next: <RoutineListItem item={nextItem.item} />
              </>
            ) : (
              <>Almost done!</>
            )}
          </div>
        </>
      )}
      {state.type === 'complete' && (
        <div className="complete">
          <p>Routine complete!</p>
          <p>
            <button
              className="big-button"
              onClick={restart}
            >
              Reset
            </button>
          </p>
        </div>
      )}
    </div>
  );
}
