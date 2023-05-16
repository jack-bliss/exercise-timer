type RepsCount = {
  type: 'count';
  count: number;
};

type RepsDuration = {
  type: 'duration';
  seconds?: number;
  minutes?: number;
};

type RoutineItemBase<Type extends string, Reps> = {
  name: string;
  type: Type;
  id: string;
  reps: Reps;
};

type CountRoutineItem = RoutineItemBase<'stretch' | 'exercise', RepsCount>;
type DurationRoutineItem = RoutineItemBase<
  'stretch' | 'rest' | 'exercise',
  RepsDuration
>;

type RoutineItem = CountRoutineItem | DurationRoutineItem;

type Routine = {
  name: string;
  items: RoutineItem[];
};
