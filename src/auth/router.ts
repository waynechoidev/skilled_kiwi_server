import express from 'express';
import { isAuth } from '../common/middleware/auth';
import * as authController from './controller';

const router = express.Router();

router.post('/sign_up', authController.signUp);

router.post('/sign_in', authController.signIn);

router.get('/me', isAuth, authController.me);

export default router;
