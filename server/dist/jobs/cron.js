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
exports.Job = void 0;
const db_1 = __importDefault(require("../utils/db"));
const node_cron_1 = __importDefault(require("node-cron"));
const parser_1 = require("./parser");
const Cron = (cronTime, website, domain, price, email, jid) => {
    node_cron_1.default.schedule(cronTime, () => {
        parser_1.checkPrice(website, domain, price, email, jid);
    }, { scheduled: true });
};
exports.Job = node_cron_1.default.schedule(`* * * * *`, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db_1.default.query('select u.email, j.* from users u inner join jobs j on j.uid = u.uid where j.status=$1', ['active']);
        if (result.rowCount > 0) {
            result.rows.map((item) => __awaiter(void 0, void 0, void 0, function* () {
                let date = item.created_at.split(':')[0];
                let hour = date.split(' ')[1];
                let cronHour;
                if (24 - (5 + parseInt(hour)) <= 1) {
                    cronHour = (parseInt(hour) + 5) - 24;
                }
                else {
                    cronHour = parseInt(hour) + 5;
                }
                console.log(cronHour);
                const cronTime = `0 ${cronHour} * * *`;
                console.log(cronTime);
                yield db_1.default.query('update jobs set status=$1 where jid=$2', ['processing', item.jid]);
                Cron(cronTime, item.website, item.product, item.price, item.email, item.jid);
            }));
        }
    }
    catch (error) {
        throw error;
    }
}));
//# sourceMappingURL=cron.js.map