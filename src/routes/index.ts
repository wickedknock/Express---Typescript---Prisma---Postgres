import { Router } from 'express';
import accountRoutes from '../modules/account';

const router = Router();

router.use('/account', accountRoutes);

export default router;
