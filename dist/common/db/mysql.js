"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
var mysql = require("mysql2");
var pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
});
exports.db = pool.promise();
//# sourceMappingURL=mysql.js.map