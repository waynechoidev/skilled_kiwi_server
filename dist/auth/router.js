"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var express_validator_1 = require("express-validator");
var validator_1 = require("../common/middleware/validator");
var authController = require("./controller");
var router = express.Router();
var validateCredential = [
    express_validator_1.body('username')
        .trim()
        .isLength({ min: 6, max: 20 })
        .withMessage('username should be 6 - 20 characters'),
    express_validator_1.body('password')
        .trim()
        .isLength({ min: 8, max: 20 })
        .withMessage('password should be 8 - 20 characters'),
    validator_1.validate,
];
var validateSignup = __spreadArray(__spreadArray([], validateCredential), [
    express_validator_1.body('email').isEmail().normalizeEmail().withMessage('invalid email'),
    express_validator_1.body('firstName').notEmpty().withMessage('first name is missing'),
    express_validator_1.body('lastName').notEmpty().withMessage('last name is missing'),
    express_validator_1.body('gender').notEmpty().withMessage('gender is missing'),
    express_validator_1.body('birthday').notEmpty().withMessage('birthday is missing'),
    express_validator_1.body('phoneNumberPrefix').notEmpty().withMessage('phoneNumberPrefix is missing'),
    express_validator_1.body('phoneNumber').notEmpty().withMessage('phoneNumber is missing'),
    express_validator_1.body('district').notEmpty().withMessage('district is missing'),
    express_validator_1.body('suburb').notEmpty().withMessage('suburb is missing'),
    validator_1.validate,
]);
var validateRefreshToken = [
    express_validator_1.body('userId').notEmpty().withMessage('userId is missing'),
    express_validator_1.body('refreshToken').notEmpty().withMessage('refreshToken is missing'),
    validator_1.validate,
];
router.post('/sign_up', validateSignup, authController.signUp);
router.post('/sign_in', validateCredential, authController.signIn);
router.post('/reissue_token', validateRefreshToken, authController.reIssueToken);
router.get('/check_username/:username', authController.checkUsername);
router.get('/check_email/:email', authController.checkEmail);
exports.default = router;
//# sourceMappingURL=router.js.map