import { v4 as uuidv4 } from 'uuid';

function isValidType(type: string): type is RoutineItem['type'] {
  return ['exercise', 'stretch', 'rest'].includes(type);
}

export function parseRoutine(name: string, content: string): Routine {
  const routine: Routine = {
    name,
    items: [],
  };
  const lines = content.split('\n');
  routine.items = lines.map((line, index) => {
    const [type, name, repsType, repsNumber] = line.split('|');
    if (!isValidType(type)) {
      throw new Error(
        `Couldn't get valid type from line ${index}: ${line}`,
      );
    }
    const reps: RepsCount | RepsDuration =
      repsType === 'count'
        ? ({
            type: 'count',
            count: parseInt(repsNumber, 10),
          } satisfies RepsCount)
        : ({
            type: 'duration',
            seconds: parseInt(repsNumber, 10),
          } satisfies RepsDuration);
    return {
      name,
      type,
      reps,
      id: uuidv4(),
    } as RoutineItem;
  });
  return routine;
}
