import { Routine } from './Routine';
import { render } from 'preact';

declare const routineData: Routine;

render(
  <Routine routine={routineData} />,
  document.getElementById('root') as HTMLElement,
);
