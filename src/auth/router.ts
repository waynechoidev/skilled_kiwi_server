import * as express from 'express';
import { body } from 'express-validator';
import { isAuth } from '../common/middleware/auth';
import { validate } from '../common/middleware/validator';
import * as authController from './controller';

const router = express.Router();

const validateCredential = [
  body('username')
    .trim()
    .isLength({ min: 6, max: 20 })
    .withMessage('username should be 6 - 20 characters'),
  body('password')
    .trim()
    .isLength({ min: 8, max: 20 })
    .withMessage('password should be 8 - 20 characters'),
  validate,
];

const validateSignup = [
  ...validateCredential,
  body('email').isEmail().normalizeEmail().withMessage('invalid email'),
  body('firstName').notEmpty().withMessage('first name is missing'),
  body('lastName').notEmpty().withMessage('last name is missing'),
  body('gender').notEmpty().withMessage('gender is missing'),
  body('birthday').notEmpty().withMessage('birthday is missing'),
  body('phoneNumberPrefix').notEmpty().withMessage('phoneNumberPrefix is missing'),
  body('phoneNumber').notEmpty().withMessage('phoneNumber is missing'),
  body('district').notEmpty().withMessage('district is missing'),
  body('suburb').notEmpty().withMessage('suburb is missing'),
  validate,
];

router.post('/sign_up', validateSignup, authController.signUp);

router.post('/sign_in', validateCredential, authController.signIn);

router.get('/me', isAuth, authController.me);

router.get('/check_username/:username', authController.checkUsername);

export default router;
