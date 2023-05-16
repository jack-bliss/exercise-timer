import express from 'express';
import { serveAssets } from './middleware/serve-assets';
import { handleError } from './middleware/handle-error';
import { routine } from './pages/routine';

export const app = express();

app.use(serveAssets);

app.use('/routine', routine);

app.use(handleError);
