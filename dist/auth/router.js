"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var express_validator_1 = require("express-validator");
var validator_1 = require("../common/middleware/validator");
var authController = require("./controller");
var router = express.Router();
var validateCredential = [
    (0, express_validator_1.body)('username')
        .trim()
        .isLength({ min: 6, max: 20 })
        .withMessage('username should be 6 - 20 characters'),
    (0, express_validator_1.body)('password')
        .trim()
        .isLength({ min: 8, max: 20 })
        .withMessage('password should be 8 - 20 characters'),
    validator_1.validate,
];
var validateSignup = __spreadArray(__spreadArray([], validateCredential, true), [
    (0, express_validator_1.body)('email').isEmail().normalizeEmail().withMessage('invalid email'),
    (0, express_validator_1.body)('firstName').notEmpty().withMessage('first name is missing'),
    (0, express_validator_1.body)('lastName').notEmpty().withMessage('last name is missing'),
    (0, express_validator_1.body)('gender').notEmpty().withMessage('gender is missing'),
    (0, express_validator_1.body)('birthday').notEmpty().withMessage('birthday is missing'),
    (0, express_validator_1.body)('phoneNumberPrefix').notEmpty().withMessage('phoneNumberPrefix is missing'),
    (0, express_validator_1.body)('phoneNumber').notEmpty().withMessage('phoneNumber is missing'),
    (0, express_validator_1.body)('district').notEmpty().withMessage('district is missing'),
    (0, express_validator_1.body)('suburb').notEmpty().withMessage('suburb is missing'),
    validator_1.validate,
], false);
var validateRefreshToken = [
    (0, express_validator_1.body)('userId').notEmpty().withMessage('userId is missing'),
    (0, express_validator_1.body)('refreshToken').notEmpty().withMessage('refreshToken is missing'),
    validator_1.validate,
];
router.post('/sign_up', validateSignup, authController.signUp);
router.post('/sign_in', validateCredential, authController.signIn);
router.post('/reissue_token', validateRefreshToken, authController.reIssueToken);
router.get('/check_username/:username', authController.checkUsername);
router.get('/check_email/:email', authController.checkEmail);
exports.default = router;
//# sourceMappingURL=router.js.map