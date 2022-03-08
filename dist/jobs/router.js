"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var auth_1 = require("./../common/middleware/auth");
var jobsController = require("./controller");
var router = express.Router();
router.get('/', jobsController.getJobs);
router.get('/:id', jobsController.getJob);
router.post('/', auth_1.isAuth, jobsController.createJob);
exports.default = router;
//# sourceMappingURL=router.js.map