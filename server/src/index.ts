import express from 'express';
import cors from 'cors';
import { Job } from './jobs/cron';
import { __prod__ } from './constants'
require('dotenv').config();
const app = express();
app.use(express.json());
app.set('trust proxy', 1);
console.log(process.env.CORS);
app.use(cors({
    origin: __prod__ ? process.env.CORS :  "http://localhost:4001",
    credentials: true
}));

require('./middleware/routes')(app)
require('./api/alerts')(app);
require('./api/users')(app);


const port = process.env.PORT || 8080
app.listen(port, () => {
    Job.start();
    console.log("Listening")
})