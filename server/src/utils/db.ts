import { Client } from 'pg';

const client = new Client({
    connectionString: 'postgres://nishgowda:2douglas@localhost:5432/pingme'
});

client.connect();
export default client;
