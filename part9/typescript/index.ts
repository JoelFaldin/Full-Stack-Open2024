import express from 'express';
const app = express();

import { calculateBmi } from './bmiCalculator';
import { parseArgs } from './utils/parsing';

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  try {
    if (height && weight) {
      const parsedValues = parseArgs([String(height), String(weight)]);
      const bmi = calculateBmi(parsedValues.height, parsedValues.weight);
      
      return res.status(200).json({
        weight: Number(weight),
        height: Number(height),
        bmi
      });
    } else {
      return res.status(400).json({ error: 'malformatted parameters' });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    } else {
      return res.status(500).json({ error: String(error) });
    }
  }
});

const port = 3003;

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});