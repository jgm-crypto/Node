// mqttRoutes.ts
import { Router } from 'express';
import { getDataMaster } from '../controllers/mqttController';

const router = Router();

router.get('/getData', getDataMaster);

export default router;

