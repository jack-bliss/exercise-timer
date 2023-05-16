import { useReducer } from 'preact/hooks';

export type PlayRoutineState =
  | { type: 'not-started' }
  | { type: 'item'; item: RoutineItem }
  | { type: 'complete' };
export type PlayRoutineAction =
  | { type: 'item'; item: RoutineItem }
  | { type: 'complete' }
  | { type: 'restart' };

function playRoutineReducer(
  state: PlayRoutineState,
  action: PlayRoutineAction,
): PlayRoutineState {
  switch (action.type) {
    case 'complete':
    case 'item': {
      return action;
    }
    case 'restart': {
      return { type: 'not-started' };
    }
    default: {
      return state;
    }
  }
}

export function usePlayRoutine() {
  const [state, dispatch] = useReducer(playRoutineReducer, {
    type: 'not-started',
  });
  return [
    state,
    {
      item: (item: RoutineItem) => dispatch({ type: 'item', item }),
      complete: () => dispatch({ type: 'complete' }),
      restart: () => dispatch({ type: 'restart' }),
    },
  ] as const;
}
