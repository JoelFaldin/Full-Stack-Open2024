import express from 'express';
const app = express();
import cors from 'cors';

import diagnosesRouter from './routes/diagnoseRouter';
import patientRouter from './routes/patientRouter';

app.use(express.json());
app.use((cors as (options: cors.CorsOptions) => express.RequestHandler)({}));

app.get('/api/ping', (_req, res) => {
  return res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientRouter);

const port = 3001;

app.listen(port, () => {
  console.log(`Server up! Listening on http://localhost:${port}`);
});
