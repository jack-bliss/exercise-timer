import { renderTemplate, getAsset } from '../../services';
import { Router } from 'express';
import template from '../template.html';

export const routine = Router();

routine.get('/:routine', async (req, res, next) => {
  try {
    const [template, data] = await Promise.all([
      getAsset('routine-template.html'),
      getAsset(`routines/${req.params.routine}.json`),
    ]);
    const page = renderTemplate(template.toString(), {
      title: `Exercise timer`,
      routineData: `<script>const routineData = ${data};</script>`,
    });
    res.type('text/html').send(page);
  } catch (error) {
    next(error);
  }
});

const routines: { label: string; path: string }[] = [
  { label: 'Gym warmup', path: 'warmup' },
  { label: 'Squats', path: 'squats' },
  { label: 'Push-ups', path: 'pushups' },
  { label: 'Savoy', path: 'savoy' },
];

routine.get('/', async (req, res) => {
  const page = renderTemplate(template, {
    title: 'Routines',
    styles: `<link rel="stylesheet" href="/bundles/routine-page.css" />
    <style>
    h4 {
      font-size: 30px;
      padding: 10px 0;
    }
    </style>`,
    body: `<h3>Routines</h3>
  <div class="not-started">
  ${routines
    .map(
      ({ path, label }) =>
        `<h4><a href="/routine/${path}">${label}</a></h4>`,
    )
    .join('\n')}
  </div>`,
  });
  return res.type('text/html').send(page);
});
