import { renderTemplate, getAsset } from '../../services';
import { Router } from 'express';

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
