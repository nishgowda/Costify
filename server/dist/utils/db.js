"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const client = new pg_1.Client({
    connectionString: 'postgres://nishgowda:2douglas@localhost:5432/pingme'
});
client.connect();
exports.default = client;
//# sourceMappingURL=db.js.map