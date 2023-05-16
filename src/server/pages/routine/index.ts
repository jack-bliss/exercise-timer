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

routine.get('/', async (req, res) => {
  const page = renderTemplate(template, {
    title: 'Routines',
    styles: '<link rel="stylesheet" href="/bundles/routine-page.css" />',
    body: `<h3>Routines</h3>
  <div class="not-started">
    <ul>
      <li><a href="/routine/warmup">Warmup</a></li>
      <li><a href="/routine/squats">Squats</a></li>
      <li><a href="/routine/pushups">Pushups</a></li>
    </ul>
  </div>`,
  });
  return res.type('text/html').send(page);
});
