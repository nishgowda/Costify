import Nighmare from 'nightmare';
const nightmare = new Nighmare();
const {default: Axios} = require('axios');
import nodemailer from 'nodemailer';
import client from '../utils/db'
import path from 'path'
//@ts-ignore
import PriceFinder from 'price-finder';
const priceFinder = new PriceFinder();

require('dotenv').config({
    path: path.resolve(__dirname, '../.env')
});

export const checkPrice = async (website: string, product: string, price: number, email: string, jid:number) => {
    try {
        let priceString;
        let priceNumber;
        console.log(website, product, price, email);
        switch (website) {
            case 'godaddy':
                let baseUrl = 'https://api.ote-godaddy.com';
                const response = await Axios.get(baseUrl + `/v1/domains/available?domain=${product}&checkType=FAST&forTransfer=false"`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `sso-key ${
                            process.env.GODADDY_KEY + ':' + process.env.GODADDY_SECRET
                        }`
                    }
                });
                const data = response.data;
                const availability = data.available;
                if (availability === false) {
                    priceNumber = price + 1;
                } else {
                    priceNumber = data.price / (Math.pow(10, 6));
                } sendSuccess(website, email, priceNumber, price, product, jid);
                break;
            case 'namecheap':
                let url = `https://www.namecheap.com/domains/registration/results/?domain=${product}`;
                priceString = await nightmare.goto(url).wait("div [class='price'] strong").evaluate(() => document.querySelector("div [class='price'] strong")!.innerHTML).end();
                priceNumber = parseFloat((priceString as unknown as string).replace('$', ''));
                sendSuccess(website, email, priceNumber, price, product, jid);
                break;
            case 'amazon':
                priceFinder.findItemPrice(product, (err: any, result: any) => {
                    if (err) {
                        sendError(err);
                    }
                    sendSuccess(website, email, result, price, product, jid);
                });
                break;
            case 'steam':
                priceFinder.findItemPrice(product, (err: any, result: any) => {
                    if (err) {
                        sendError(err);
                    }
                    sendSuccess(website, email, result, price, product, jid);
                });
                break;
            case 'craigslist':
                priceString = await nightmare.goto(product).wait("span [class='price']").evaluate(() => document.querySelector("span [class='price']")!.innerHTML).end();
                priceNumber = parseFloat((priceString as unknown as string).replace('$', ''));
                sendSuccess(website, email, priceNumber, price, product, jid);
                break;
            case 'wallmart':
                priceFinder.findItemPrice(product, (err: any, result: any) => {
                    if (err) {
                        sendError(err);
                    }
                    sendSuccess(website, email, result, price, product, jid);
                })
                break;
            default:
                break;
        }
    } catch (error) {
        console.log(error);
        await sendError(error);
    }
}
const sendSuccess = async (website: string, email: string, priceNumber: number, price: number, product: string, jid: number) => {
    try {
        if (priceNumber < price) {
            let subject = 'Your item is on sale now!';
            let body = `The price for ${product} is less than $${price}!  Now at: $` + priceNumber + ` at ${website}.com`;
            await sendMail(email, subject, body);
            await client.query("update jobs set status=$1 where jid=$2", ['completed', jid]);
        }
    } catch (error) {
        throw error;
    }

}

const sendError = async (error: any) => {
    try {
        await sendMail('"PingMe" <no-reply@pingme.com>', 'There was an error sending mail', error);
    } catch (err) {
        throw err;
    }
}

const sendMail = async (user: string, subject: string, body: string) => {
    try {
        let testAccount = await nodemailer.createTestAccount();
        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email", port: 587, secure: false, // true for 465, false for other ports
            auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass, // generated ethereal password
            }
        });
        let info = await transporter.sendMail({
            from: '"PingMe" <no-reply@pingme.com>', // sender address
            to: user, // list of receivers
            subject: subject, // Subject line
            text: body, // plain text body
        });
        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    } catch (error) {
        console.log(error);
    }
}





