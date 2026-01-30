import { Router } from 'express';
import * as configController from '../controllers/configController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.use(authMiddleware);

router.get('/', configController.getAuditLog);

export default router;
