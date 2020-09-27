import { Client } from 'pg';
import { __prod__ } from '../constants'
require('dotenv').config()
const client = new Client({
    connectionString: __prod__ === true ? process.env.DATABASE_URL : 'postgres://nishgowda:2douglas@localhost:5432/costify'
});

client.connect();
export default client;
