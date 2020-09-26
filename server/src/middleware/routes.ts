import express from 'express';
import { Request, Response, Application } from 'express';
import { CostifyUser } from '../types/User'
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
import client from '../utils/db';
import passport from 'passport';
import redis from 'redis';
import session from 'express-session';
const RedisStore = require('connect-redis')(session)
const redisClient = redis.createClient()
require('./pass');
require('dotenv').config();


module.exports =  (app: Application) => {
    app.use(
        session({
           name: 'access-token',
            store: new RedisStore({
                client: redisClient,
                disableTouch: true
            }),
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 7, // One week
                httpOnly: true,
                sameSite: 'lax',
                secure: false, //cookie only works in https
            },
            secret: process.env.SESSION_SECRET || 'blah',
            resave: false,
            saveUninitialized: false
        
      })
    )

    app.use(passport.initialize())
    app.use(passport.session())
    
    app.post('/register', passport.authenticate('register', { failureMessage: "Failed to Register" }), async (req: Request, res: Response) => {
        try {
            const user = req.user as CostifyUser;
            client.query('update users set name=$1 where email=$2', [req.body.name,user.email ], (err, _) => {
                if (err) throw err;
                res.status(200).send("Authorized");
            })
        } catch (error) {
            throw error;
        }
    })
    app.post('/login', passport.authenticate('login', { failureMessage: "Failed to Login" }), async (req: Request, res: Response) => {
        try {
            console.log(req.user)
            res.status(200).send("Authorized");
        } catch (error) {
            throw error;
        }
    })
    
    app.get('/logout', (req:Request , res: Response) => {
        req.session = undefined;
        res.clearCookie('access-token', {httpOnly: true, sameSite: 'lax',})
        req.logout();
        res.status(200).send('Logged Out')
    })
}
