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
exports.remove = exports.update = exports.create = exports.getById = exports.get = void 0;
var mysql_1 = require("./../common/db/mysql");
var SELECT_JOIN = 'SELECT jo.id, jo.title, jo.district, jo.suburb, jo.category, jo.detail, jo.images, jo.createdAt, jo.userId, jo.pay, us.username FROM jobs as jo JOIN users as us ON jo.userId=us.id';
var ORDER_DESC = 'ORDER BY jo.createdAt DESC';
function get(q, district, suburb, category) {
    return __awaiter(this, void 0, void 0, function () {
        var query;
        return __generator(this, function (_a) {
            query = '';
            if (q) {
                query += " AND jo.title LIKE '%" + q + "%'";
            }
            if (district) {
                query += " AND jo.district='" + district + "'";
            }
            if (suburb) {
                query += " AND jo.suburb='" + suburb + "'";
            }
            if (category) {
                query += " AND jo.category='" + category + "'";
            }
            query = query.replace(' AND', 'WHERE');
            return [2, mysql_1.db
                    .execute(SELECT_JOIN + " " + query + " " + ORDER_DESC)
                    .then(function (result) { return result[0]; })];
        });
    });
}
exports.get = get;
function getById(id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2, mysql_1.db.execute(SELECT_JOIN + " WHERE jo.id=?", [id]).then(function (result) { return result[0][0]; })];
        });
    });
}
exports.getById = getById;
function create(value, userId) {
    return __awaiter(this, void 0, void 0, function () {
        var title, district, suburb, category, detail, images, pay;
        return __generator(this, function (_a) {
            title = value.title, district = value.district, suburb = value.suburb, category = value.category, detail = value.detail, images = value.images, pay = value.pay;
            return [2, mysql_1.db
                    .execute('INSERT INTO jobs (title, district, suburb, category, detail, images, pay, createdAt, userId) VALUES(?,?,?,?,?,?,?,?,?)', [title, district, suburb, category, detail, images, pay, new Date(), userId])
                    .then(function (result) { return getById(result[0].insertId); })];
        });
    });
}
exports.create = create;
function update(id, text) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2, mysql_1.db.execute('UPDATE jobs SET text=? WHERE id=?', [text, id]).then(function () { return getById(id); })];
        });
    });
}
exports.update = update;
function remove(id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2, mysql_1.db.execute('DELETE FROM jobs WHERE id=?', [id])];
        });
    });
}
exports.remove = remove;
//# sourceMappingURL=data.js.map