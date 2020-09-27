"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const constants_1 = require("../constants");
require('dotenv').config();
const client = new pg_1.Client({
    connectionString: constants_1.__prod__ === true ? process.env.DATABASE_URL : 'postgres://nishgowda:2douglas@localhost:5432/costify'
});
client.connect();
exports.default = client;
//# sourceMappingURL=db.js.map