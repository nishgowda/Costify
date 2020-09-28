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
const constants_1 = require("../constants");
const cors_1 = __importDefault(require("cors"));
require('dotenv').config();
const app = express_1.default();
app.use(express_1.default.json());
app.set('trust proxy', 1);
app.use(cors_1.default({
    origin: constants_1.__prod__ ? process.env.CORS : "http://localhost:4001",
    credentials: true
}));
const db_1 = __importDefault(require("../utils/db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const redis_1 = __importDefault(require("redis"));
const express_session_1 = __importDefault(require("express-session"));
const RedisStore = require('connect-redis')(express_session_1.default);
const redisClient = constants_1.__prod__ ? redis_1.default.createClient({ url: process.env.REDIS_URL }) : redis_1.default.createClient();
module.exports = (app) => {
    app.use(express_session_1.default({
        name: process.env.COOKIE_NAME,
        store: new RedisStore({
            client: redisClient,
            disableTouch: true
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true,
            secure: constants_1.__prod__ ? true : false,
            domain: constants_1.__prod__ ? process.env.DOMAIN : 'localhost',
            sameSite: 'lax'
        },
        secret: process.env.SESSION_SECRET || 'foo',
        resave: true,
        proxy: true,
        saveUninitialized: false
    }));
    app.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const insert = yield db_1.default.query('select * from users where email=$1', [req.body.email]);
            if (insert.rowCount > 0) {
                res.status(500).send("Email is taken");
            }
            else {
                bcrypt_1.default.hash(req.body.password, 10).then(hashedPassword => {
                    db_1.default.query('insert into users(email, name, password) values($1, $2, $3) returning *', [req.body.email, req.body.name, hashedPassword], (_, result) => {
                        req.session.userId = result.rows[0].uid;
                        console.log(req.session.userId);
                        res.status(200).send("Authorized");
                    });
                });
            }
        }
        catch (error) {
            throw error;
        }
    }));
    app.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield db_1.default.query('select * from users where email =$1', [req.body.email]);
            if (user.rowCount < 1) {
                return res.status(500).send("Bad Eamil");
            }
            else {
                bcrypt_1.default.compare(req.body.password, user.rows[0].password).then(response => {
                    if (!response) {
                        return res.status(500).send("Bad Password");
                    }
                    req.session.userId = user.rows[0].uid;
                    console.log("SESSION:", req.session.userId);
                    return res.status(200).send("Authorized");
                });
            }
        }
        catch (error) {
            throw error;
        }
    }));
    app.get('/logout', (req, res) => {
        req.session = undefined;
        res.clearCookie(process.env.COOKIE_NAME || 'foo', { httpOnly: true, sameSite: 'lax', domain: process.env.DOMAIN, });
        res.status(200).send('Logged Out');
    });
};
//# sourceMappingURL=routes.js.map