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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("../utils/db"));
const constants_1 = require("../constants");
const verify_1 = require("../middleware/verify");
require('dotenv').config();
const app = express_1.default();
app.use(express_1.default.json());
app.set('trust proxy', 1);
app.use(cors_1.default({
    origin: constants_1.__prod__ ? process.env.CORS : "http://localhost:4001",
    credentials: true
}));
module.exports = (app) => {
    app.get('/v1/users', verify_1.isAuthenticated, (_, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const results = yield db_1.default.query('select * from users');
            res.status(200).send(results.rows);
        }
        catch (error) {
            throw error;
        }
    }));
    app.get('/v1/users/:uid', verify_1.isAuthenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield db_1.default.query('select * from users where uid=$1', [req.params.uid]);
            res.status(200).send(result.rows);
        }
        catch (error) {
            throw error;
        }
    }));
    app.get('/v1/user/me', verify_1.isAuthenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield db_1.default.query('select * from users where uid=$1', [req.session.userId]);
            res.status(200).send(result.rows[0]);
        }
        catch (error) {
            return error;
        }
    }));
    app.post('/v1/users', verify_1.isAuthenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield db_1.default.query('insert into users(email, name, password) values($1, $2, $3)', [req.body.email, req.body.name, req.body.password]);
            res.status(200).send(result.rows);
        }
        catch (error) {
            throw error;
        }
    }));
};
//# sourceMappingURL=users.js.map