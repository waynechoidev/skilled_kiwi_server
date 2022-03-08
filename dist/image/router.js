"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var auth_1 = require("./../common/middleware/auth");
var imageController = require("./controller");
var router = express.Router();
router.post('/upload', auth_1.isAuth, imageController.upload);
exports.default = router;
//# sourceMappingURL=router.js.map