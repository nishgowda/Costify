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
exports.checkPrice = void 0;
const nightmare_1 = __importDefault(require("nightmare"));
const nightmare = new nightmare_1.default();
const axios_1 = __importDefault(require("axios"));
const db_1 = __importDefault(require("../utils/db"));
const path_1 = __importDefault(require("path"));
const price_finder_1 = __importDefault(require("price-finder"));
const priceFinder = new price_finder_1.default();
require('dotenv').config({
    path: path_1.default.resolve(__dirname, '../.env')
});
const mail_1 = __importDefault(require("@sendgrid/mail"));
mail_1.default.setApiKey(process.env.SENDGRID_KEY);
exports.checkPrice = (website, product, price, email, jid) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let priceString;
        let priceNumber;
        console.log(website, product, price, email);
        switch (website) {
            case 'godaddy':
                let baseUrl = 'https://api.ote-godaddy.com';
                const response = yield axios_1.default.get(baseUrl + `/v1/domains/available?domain=${product}&checkType=FAST&forTransfer=false"`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `sso-key ${process.env.GODADDY_KEY + ':' + process.env.GODADDY_SECRET}`
                    }
                });
                const data = response.data;
                const availability = data.available;
                if (availability === false) {
                    priceNumber = price + 1;
                }
                else {
                    priceNumber = data.price / (Math.pow(10, 6));
                }
                sendSuccess(website, email, priceNumber, price, product, jid);
                break;
            case 'namecheap':
                let url = `https://www.namecheap.com/domains/registration/results/?domain=${product}`;
                priceString = yield nightmare.goto(url).wait("div [class='price'] strong").evaluate(() => document.querySelector("div [class='price'] strong").innerHTML).end();
                priceNumber = parseFloat(priceString.replace('$', ''));
                sendSuccess(website, email, priceNumber, price, product, jid);
                break;
            case 'amazon':
                priceFinder.findItemPrice(product, (err, result) => {
                    if (err) {
                        sendError(err);
                    }
                    sendSuccess(website, email, result, price, product, jid);
                });
                break;
            case 'steam':
                priceFinder.findItemPrice(product, (err, result) => {
                    if (err) {
                        sendError(err);
                    }
                    sendSuccess(website, email, result, price, product, jid);
                });
                break;
            case 'craigslist':
                priceString = yield nightmare.goto(product).wait("span [class='price']").evaluate(() => document.querySelector("span [class='price']").innerHTML).end();
                priceNumber = parseFloat(priceString.replace('$', ''));
                sendSuccess(website, email, priceNumber, price, product, jid);
                break;
            case 'wallmart':
                priceFinder.findItemPrice(product, (err, result) => {
                    if (err) {
                        sendError(err);
                    }
                    sendSuccess(website, email, result, price, product, jid);
                });
                break;
            default:
                break;
        }
    }
    catch (error) {
        console.log(error);
        yield sendError(error);
    }
});
const sendSuccess = (website, email, priceNumber, price, product, jid) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (priceNumber < price) {
            let subject = 'Your item is on sale now!';
            let body = `The price for ${product} is less than $${price}! It's now at: $` + priceNumber + ` at https://${website}.com`;
            yield sendMail(email, subject, body);
            yield db_1.default.query("update jobs set status=$1 where jid=$2", ['completed', jid]);
        }
    }
    catch (error) {
        throw error;
    }
});
const sendError = (error) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sendMail('support@costify.ga', 'There was an error sending mail', error);
    }
    catch (err) {
        throw err;
    }
});
const sendMail = (user, subject, body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const message = {
            to: user,
            from: 'support@costify.ga',
            subject: subject,
            text: body
        };
        mail_1.default.send(message).then(() => {
            console.log("Message Sent");
        }).catch((err) => {
            throw err;
        });
    }
    catch (error) {
        throw error;
    }
});
//# sourceMappingURL=parser.js.map