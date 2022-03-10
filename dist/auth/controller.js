"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkEmail = exports.checkUsername = exports.reIssueToken = exports.signIn = exports.signUp = void 0;
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var userRepository = require("./data");
var refreshTokenSecretKey = 'F2dN7x8HVzBWaQuEEDnhsvHXRWqAR63z';
var refreshTokenExpires = '14d';
var accessTokenSecretKey = 'F2dN7x8HVzBWaQuEEDnhsvHXRWqAR63z';
var accessTokenExpires = 7200;
var bcryptSaltRounds = 12;
var date = new Date();
function signUp(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, username, password, email, firstName, lastName, gender, birthday, phoneNumberPrefix, phoneNumber, district, suburb, found, hashed;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, username = _a.username, password = _a.password, email = _a.email, firstName = _a.firstName, lastName = _a.lastName, gender = _a.gender, birthday = _a.birthday, phoneNumberPrefix = _a.phoneNumberPrefix, phoneNumber = _a.phoneNumber, district = _a.district, suburb = _a.suburb;
                    return [4, userRepository.findByUsername(username)];
                case 1:
                    found = _b.sent();
                    if (found) {
                        return [2, res.status(409).json({ message: "".concat(username, " already exists") })];
                    }
                    return [4, bcrypt.hash(password, bcryptSaltRounds)];
                case 2:
                    hashed = _b.sent();
                    return [4, userRepository.createUser({
                            username: username,
                            password: hashed,
                            email: email,
                            firstName: firstName,
                            lastName: lastName,
                            gender: gender,
                            birthday: birthday,
                            phoneNumberPrefix: phoneNumberPrefix,
                            phoneNumber: phoneNumber,
                            district: district,
                            suburb: suburb,
                        })];
                case 3:
                    _b.sent();
                    return [2, res.status(201).json({ message: "Success to make user for ".concat(username) })];
            }
        });
    });
}
exports.signUp = signUp;
function signIn(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, username, password, user, userId, isValidPassword, _b, refreshToken, accessToken;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = req.body, username = _a.username, password = _a.password;
                    return [4, userRepository.findByUsername(username)];
                case 1:
                    user = _c.sent();
                    userId = user.id.toString();
                    if (!user) {
                        return [2, res.status(401).json({ message: 'Invalid Username or Password' })];
                    }
                    return [4, bcrypt.compare(password, user.password)];
                case 2:
                    isValidPassword = _c.sent();
                    if (!isValidPassword) {
                        return [2, res.status(401).json({ message: 'Invalid Username or Password' })];
                    }
                    _b = createTokens(userId), refreshToken = _b.refreshToken, accessToken = _b.accessToken;
                    res.status(201).json({
                        userId: userId,
                        refreshToken: refreshToken,
                        accessToken: accessToken,
                        expiredTime: (date.getTime() + accessTokenExpires * 1000).toString(),
                    });
                    return [2];
            }
        });
    });
}
exports.signIn = signIn;
function reIssueToken(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, refreshToken, userId, isExistToken, _b, refreshToken_1, accessToken;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = req.body, refreshToken = _a.refreshToken, userId = _a.userId;
                    return [4, userRepository.checkRefreshToken(userId, refreshToken)];
                case 1:
                    isExistToken = _c.sent();
                    if (isExistToken) {
                        _b = createTokens(userId), refreshToken_1 = _b.refreshToken, accessToken = _b.accessToken;
                        res.status(201).json({
                            userId: userId,
                            refreshToken: refreshToken_1,
                            accessToken: accessToken,
                            expiredTime: (date.getTime() + accessTokenExpires * 1000).toString(),
                        });
                    }
                    else {
                        return [2, res.status(401).json({ message: 'refresh token is not valid' })];
                    }
                    return [2];
            }
        });
    });
}
exports.reIssueToken = reIssueToken;
function checkUsername(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var username, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    username = req.params.username;
                    return [4, userRepository.findByUsername(username)];
                case 1:
                    user = _a.sent();
                    if (user === null || user === void 0 ? void 0 : user.username) {
                        return [2, res.json({ isValid: false })];
                    }
                    else {
                        return [2, res.json({ isValid: true })];
                    }
                    return [2];
            }
        });
    });
}
exports.checkUsername = checkUsername;
function checkEmail(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var email, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    email = req.params.email;
                    return [4, userRepository.findByEmail(email)];
                case 1:
                    user = _a.sent();
                    if (user === null || user === void 0 ? void 0 : user.email) {
                        return [2, res.json({ isValid: false })];
                    }
                    else {
                        return [2, res.json({ isValid: true })];
                    }
                    return [2];
            }
        });
    });
}
exports.checkEmail = checkEmail;
function createTokens(userId) {
    var refreshToken = jwt.sign({ userId: userId }, refreshTokenSecretKey, {
        expiresIn: refreshTokenExpires,
    });
    var accessToken = jwt.sign({ userId: userId }, accessTokenSecretKey, {
        expiresIn: accessTokenExpires,
    });
    userRepository.storeRefreshToken(userId, refreshToken);
    return { refreshToken: refreshToken, accessToken: accessToken };
}
//# sourceMappingURL=controller.js.map