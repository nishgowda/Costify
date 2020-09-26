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
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
const LocalStrategy = passport_local_1.default.Strategy;
const db_1 = __importDefault(require("../utils/db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
require('dotenv').config();
passport_1.default.serializeUser((user, done) => {
    done(null, user.uid);
});
passport_1.default.deserializeUser((user, done) => {
    db_1.default.query(`select * from users where uid =$1`, [user], (err, result) => {
        if (err)
            throw err;
        done(null, result.rows[0]);
    });
});
passport_1.default.use('register', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
}, (username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        db_1.default.query('select * from users where email=$1', [username], (err, result) => {
            if (err)
                throw err;
            if (result.rowCount > 0) {
                return done(null, false, { message: "email already taken" });
            }
            else {
                bcrypt_1.default.hash(password, 10).then(hashedPassword => {
                    db_1.default.query('insert into users(email,name,password) values($1, $2, $3 ) returning *', [username, ' ', hashedPassword], (error, results) => {
                        if (error)
                            throw err;
                        return done(null, results.rows[0]);
                    });
                });
            }
        });
    }
    catch (error) {
        return done(error);
    }
})));
passport_1.default.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
}, (username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        db_1.default.query('select * from users where email=$1', [username], (err, result) => {
            if (err)
                throw err;
            if (result.rowCount < 1) {
                return done(null, false, { message: 'bad email' });
            }
            else {
                bcrypt_1.default.compare(password, result.rows[0].password).then(response => {
                    if (!response) {
                        return done(null, false, { message: "password does not match" });
                    }
                    return done(null, result.rows[0]);
                });
            }
        });
    }
    catch (error) {
        return done(error);
    }
})));
//# sourceMappingURL=pass.js.map