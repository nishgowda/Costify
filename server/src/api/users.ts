import express, { Application, Request, Response} from 'express'
import cors from 'cors';
import { CostifyUser} from '../types/User'
import client from '../utils/db';
const app = express()
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));



import { isAuthenticated } from '../middleware/verify';
require('dotenv').config();

module.exports = (app: Application) => {
    app.get('/v1/users', isAuthenticated, async (_, res: Response) => {
        try {
                const results = await client.query('select * from users')
                res.status(200).send(results.rows)
        } catch (error) {
            throw error;
        }
    })
    
    app.get('/v1/users/:uid', isAuthenticated, async (req: Request, res: Response) => {
        try {
                const result = await client.query('select * from users where uid=$1', [req.params.uid])
                res.status(200).send(result.rows);
        } catch (error) {
            throw error;
        }
       
    })
    app.get('/v1/user/me', isAuthenticated, async (req: Request, res: Response) => {
        try {
                const user = req.user as CostifyUser
                const result = await client.query('select * from users where uid=$1', [user.uid]);
                res.status(200).send(result.rows[0]);
        } catch (error) {
            return error;
        }
    })
    app.post('/v1/users', isAuthenticated, async (req: Request, res: Response) => {
        try {
                const result = await client.query('insert into users(email, name, password) values($1, $2, $3)', [req.body.email, req.body.name, req.body.password]);
                res.status(200).send(result.rows);
        } catch (error) {
            throw error;
        }
        
    })
}
