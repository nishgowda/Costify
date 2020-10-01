import client from '../utils/db'
import cron from 'node-cron'
import {checkPrice } from './parser'

const Cron = (cronTime: string, website: string, domain: string, price: number, email:string, jid: number) => {
    var task = cron.schedule(cronTime, () => {
        checkPrice(website, domain, price, email, jid, task)
    }, { scheduled: true });
}

export const Job = cron.schedule(`* * * * *`, async () => {
    try {
        const result = await client.query('select u.email, j.* from users u inner join jobs j on j.uid = u.uid where j.status=$1', ['active']);
        if (result.rowCount > 0) {
            result.rows.map(async (item) => {
                let date = item.created_at.split(':')[0]
                let hour = date.split(' ')[1];
                let cronHour;
                if (24 - (5 + parseInt(hour)) <= 1) {
                    cronHour = (parseInt(hour) + 5) - 24;
                } else {
                    cronHour = parseInt(hour) + 5
                }
                console.log(cronHour);
                const cronTime = `0 ${cronHour} * * *`;
                //const cronTime = `* * * * *`;
                console.log(cronTime);
                await client.query('update jobs set status=$1 where jid=$2', ['processing', item.jid]);
                Cron(cronTime, item.website, item.product, item.price, item.email, item.jid);
            })
        }
    } catch (error) {
        throw error;
    }
    
}, {scheduled: true})






