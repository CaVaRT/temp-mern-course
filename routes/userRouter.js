import { Router } from 'express';
import {
  updateUser,
  getApplicationStats,
  getCurrentUser,
} from '../controllers/userControllers.js';
import { validateUpdateUserInput } from '../middleware/validationMiddleware.js';
import {
  authorizePermissions,
  checkForTestUser,
} from '../middleware/authMiddleware.js';
import multerMiddleware from '../middleware/multerMiddleware.js';

const router = Router();

router.patch(
  '/update-user', checkForTestUser,
  multerMiddleware.single('avatar'),
  validateUpdateUserInput,
  updateUser
);
router.get('/current-user', getCurrentUser);
router.get(
  '/admin/app-stats',
  authorizePermissions('admin'),
  getApplicationStats
);

export default router;
