import express from 'express';
import { Request, Response, Application } from 'express';
import { __prod__} from '../constants' 
import cors from 'cors';
require('dotenv').config();
const app = express();
app.use(express.json());
app.set('trust proxy', 1);
app.use(cors({
    origin: __prod__  ? process.env.CORS : "http://localhost:4001",
    credentials: true
}));
import client from '../utils/db';
import bcrypt from 'bcrypt';
import redis from 'redis';
import session from 'express-session';
const RedisStore = require('connect-redis')(session)
const redisClient = __prod__ ? redis.createClient({ url: process.env.REDIS_URL }) : redis.createClient();


module.exports =  (app: Application) => {
    app.use(
        session({
           name: process.env.COOKIE_NAME,
            store: new RedisStore({
                client: redisClient,
                disableTouch: true
            }),
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 7, // One week
                httpOnly: true,
                secure: __prod__ ? true: false,
                domain: __prod__ ? process.env.DOMAIN : 'localhost',
                sameSite: 'lax'
            },
            secret: process.env.SESSION_SECRET || 'foo',
            resave: true,
            proxy: true,
            saveUninitialized: false
        
      })
    )

    
    app.post('/register', async (req: Request, res: Response) => {
        try {
            const insert = await client.query('select * from users where email=$1', [req.body.email]);
            if (insert.rowCount > 0) {
                res.status(400).send("Email is taken")
            } else {
                bcrypt.hash(req.body.password, 10).then(hashedPassword => {
                    client.query('insert into users(email, name, password) values($1, $2, $3) returning *', [req.body.email, req.body.name, hashedPassword], (_, result) => {
                        
                        req.session!.userId = result.rows[0].uid;
                        res.status(200).send("Authorized");
                    });
                })
            }
        } catch (error) {
            throw error;
        }
    })
    app.post('/login', async (req: Request, res: Response) => {
        try {
            const user = await client.query('select * from users where email =$1', [req.body.email]);
            if (user.rowCount < 1) {
                return res.status(400).send("Bad Eamil");
            } else {
               const response = await bcrypt.compare(req.body.password, user.rows[0].password)
                    if (!response) {
                        return res.status(400).send("Bad Password");
                    }
                    req.session!.userId = user.rows[0].uid;
                    return res.status(200).send("Authorized");
            }
        } catch (error) {
            throw error;
        }
    })
    
    app.get('/logout', (req:Request , res: Response) => {
        req.session = undefined;
        res.clearCookie(process.env.COOKIE_NAME || 'sid', { httpOnly: true, sameSite: 'lax', domain: __prod__ ? process.env.DOMAIN : 'localhost' });
        res.status(200).send('Logged Out')
    })
}