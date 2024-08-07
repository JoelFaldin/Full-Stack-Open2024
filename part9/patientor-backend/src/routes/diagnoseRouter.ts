import express from 'express';

import diagnoseService from '../services/diagnoseService';

const diagnosesRouter = express.Router();

diagnosesRouter.get('/', (_req, res) => {
  return res.status(200).json({ data: diagnoseService.getDiagnoses() });
});

export default diagnosesRouter;