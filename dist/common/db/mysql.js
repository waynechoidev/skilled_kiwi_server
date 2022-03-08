"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
var mysql = require("mysql2");
var pool = mysql.createPool({
    host: 'localhost',
    user: 'wayne',
    database: 'skilled_kiwi',
    password: '1jun90kr',
});
exports.db = pool.promise();
//# sourceMappingURL=mysql.js.map