"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
var express_validator_1 = require("express-validator");
var validate = function (req, res, next) {
    var errors = express_validator_1.validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    return res.status(400).json({ message: errors.array()[0].msg });
};
exports.validate = validate;
//# sourceMappingURL=validator.js.map