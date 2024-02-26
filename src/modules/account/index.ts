import { Router } from 'express';
import accountController from './controller/account.controller';
import jwtCheck from '../../utils/jwt';

const router = Router();

// Account Login for user
router.post('/login', accountController.userLogin);

// Get List of all accounts using query parameter limit
router.get('/list',jwtCheck, accountController.getAllAccounts);

// Crud Endpoints
router.post('/', accountController.createAccount);
router.get('/:accountId', accountController.readAccount);
router.delete('/:accountId', accountController.deleteAccount);
router.patch('/:accountId', accountController.updateAccount);

export default router;
