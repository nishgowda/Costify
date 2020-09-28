import express, { Application, Request, Response} from 'express'
import cors from 'cors';
import client from '../utils/db';
import { __prod__ } from '../constants'
import  { isAuthenticated }  from '../middleware/verify';
require('dotenv').config();
const app = express()
app.use(express.json());
app.set('trust proxy', 1);
app.use(cors({
    origin:  __prod__  ? process.env.CORS : "http://localhost:4001",
    credentials: true
}));

module.exports =  (app: Application) => {
    
    app.get('/v1/jobs/:jid', isAuthenticated, async (req: Request, res: Response) => {
        try {
                const result = await client.query('select * from jobs where jid=$1', [req.params.jid]);
                res.status(200).send(result.rows);
        } catch (error) {
            throw error;
        }
        
    })
    app.get('/v1/me/jobs', isAuthenticated,  async (req: Request, res: Response) => {
        try {
            const results = await client.query('select * from jobs where uid=$1 order by jid desc', [req.session!.userId]);
                res.status(200).send(results.rows);
        } catch (error) {
            throw error;
        }
        
    })
    app.get('/v1/jobs', isAuthenticated,  async (_, res: Response) => {
        try {
                const results = await client.query('select * from jobs');
                res.status(200).send(results.rows)
        } catch (error) {
            throw error;
        }
    })
    
    app.post('/v1/jobs', isAuthenticated, async (req: Request, res: Response) => {
        try {
            let date = new Date().toISOString().slice(0, 19).replace('T', ' ');
                const result = await client.query('insert into jobs(website, product, price, uid, created_at, status) values($1, $2, $3, $4, $5, $6)', [req.body.website, req.body.product, req.body.price, req.session!.userId, date, 'active']);    
                res.status(200).send(result.rows);
        } catch (error) {
            throw error;
        }
        
    })
    
    app.put('/v1/jobs/:jid', isAuthenticated, async (req: Request, res: Response) => {
        try {
            let date = new Date().toISOString().slice(0, 19).replace('T', ' ');
            const result = await client.query('update jobs set website=$1, product=$2, price=$3 status=$4 date=$5 where jid=$6', [req.body.website, req.body.product, req.body.price, 'active', date, req.params.jid]);
            res.status(200).send(result.rows);
        } catch (error) {
            throw error;
    
        }
    })
    
    app.delete('/v1/jobs/:jid', isAuthenticated, async (req: Request, res: Response) => {
        try {
            const result = await client.query('delete from jobs where jid=$1', [req.params.jid]);
                res.status(200).send(result.rows)
        } catch (error) {
            throw error;
        }
    })
}
