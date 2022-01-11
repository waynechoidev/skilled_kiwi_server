import express from 'express';
import { isAuth } from '../middleware/auth';
import * as authController from './controller';

const router = express.Router();

router.post('/signup', authController.signup);

router.post('/login', authController.login);

router.get('/me', isAuth, authController.me);

export default router;
