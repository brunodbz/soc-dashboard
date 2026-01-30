import { Router } from 'express';
import * as dashboardController from '../controllers/dashboardController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.get('/data', authMiddleware, dashboardController.getDashboardData);

export default router;
