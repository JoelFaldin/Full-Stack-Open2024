import express from 'express';
const app = express();
import cors from 'cors';

app.use(express.json());
app.use((cors as (options: cors.CorsOptions) => express.RequestHandler)({}));

app.get('/api/ping', (_req, res) => {
  return res.send('pong');
});

const port = 3001;

app.listen(port, () => {
  console.log(`Server up! Listening on http://localhost:${port}`);
});
