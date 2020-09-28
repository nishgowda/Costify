"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cron_1 = require("./jobs/cron");
const constants_1 = require("./constants");
require('dotenv').config();
const app = express_1.default();
app.use(express_1.default.json());
app.set('trust proxy', 1);
console.log(process.env.CORS);
app.use(cors_1.default({
    origin: constants_1.__prod__ ? process.env.CORS : "http://localhost:4001",
    credentials: true
}));
require('./middleware/routes')(app);
require('./api/alerts')(app);
require('./api/users')(app);
const port = process.env.PORT || 8080;
app.listen(port, () => {
    cron_1.Job.start();
    console.log("Listening");
});
//# sourceMappingURL=index.js.map