import { Router } from 'express';
import * as configController from '../controllers/configController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.use(authMiddleware);

router.get('/', configController.getAllConfigs);
router.get('/:id', configController.getConfigById);
router.post('/', configController.createConfig);
router.put('/:id', configController.updateConfig);
router.delete('/:id', configController.deleteConfig);

export default router;
