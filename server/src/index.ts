import express from 'express';
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
require('./middleware/pass')
require('./middleware/routes')(app)
require('./api/alerts')(app);
require('./api/users')(app);
require('dotenv').config();




app.listen(4000, () => 'Listening')