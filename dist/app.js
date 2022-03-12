"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = require("body-parser");
var cors = require("cors");
require("dotenv/config");
var express = require("express");
var router_1 = require("./auth/router");
var mysql_1 = require("./common/db/mysql");
var router_2 = require("./jobs/router");
var app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.get('/', function (req, res) {
    res.send('connect');
});
app.use('/jobs', router_2.default);
app.use('/auth', router_1.default);
app.use(function (req, res, next) {
    res.sendStatus(404);
});
app.use(function (error, req, res, next) {
    console.error(error);
    res.sendStatus(500);
});
mysql_1.db.getConnection()
    .then(function (c) { return console.log('db loaded'); })
    .catch(function (e) { return console.error(e); });
app.listen(process.env.PORT || 8080);
//# sourceMappingURL=app.js.map