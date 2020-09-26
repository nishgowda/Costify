"use strict";
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
require('./middleware/pass');
require('./middleware/routes')(app);
require('./api/alerts')(app);
require('./api/users')(app);
require('dotenv').config();
app.listen(4000, () => 'Listening');
//# sourceMappingURL=index.js.map