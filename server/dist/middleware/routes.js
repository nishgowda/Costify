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
const app = express_1.default();
app.use(express_1.default.json());
app.use(cors_1.default({
    origin: "http://localhost:3000",
    credentials: true
}));
const db_1 = __importDefault(require("../utils/db"));
const passport_1 = __importDefault(require("passport"));
const redis_1 = __importDefault(require("redis"));
const express_session_1 = __importDefault(require("express-session"));
const RedisStore = require('connect-redis')(express_session_1.default);
const redisClient = redis_1.default.createClient();
require('./pass');
require('dotenv').config();
module.exports = (app) => {
    app.use(express_session_1.default({
        name: 'access-token',
        store: new RedisStore({
            client: redisClient,
            disableTouch: true
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true,
            sameSite: 'lax',
            secure: false,
        },
        secret: process.env.SESSION_SECRET || 'blah',
        resave: false,
        saveUninitialized: false
    }));
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
    app.post('/register', passport_1.default.authenticate('register', { failureMessage: "Failed to Register" }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = req.user;
            db_1.default.query('update users set name=$1 where email=$2', [req.body.name, user.email], (err, _) => {
                if (err)
                    throw err;
                res.status(200).send("Authorized");
            });
        }
        catch (error) {
            throw error;
        }
    }));
    app.post('/login', passport_1.default.authenticate('login', { failureMessage: "Failed to Login" }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log(req.user);
            res.status(200).send("Authorized");
        }
        catch (error) {
            throw error;
        }
    }));
    app.get('/logout', (req, res) => {
        req.session = undefined;
        res.clearCookie('access-token', { httpOnly: true, sameSite: 'lax', });
        req.logout();
        res.status(200).send('Logged Out');
    });
};
//# sourceMappingURL=routes.js.map