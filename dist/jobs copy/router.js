"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var jobsController = require("./controller");
var router = express.Router();
router.get('/', jobsController.getJobs);
router.get('/:id', jobsController.getJobs);
router.post('/', jobsController.createJob);
router.put('/:id', jobsController.updateJob);
router.delete('/:id', jobsController.deleteJob);
exports.default = router;
//# sourceMappingURL=router.js.map