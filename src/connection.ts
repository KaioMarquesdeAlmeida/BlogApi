import { Client } from 'pg';
const connectionString = 'postgres://postgres:123@localhost:5432/teste';
const client = new Client(connectionString);
client.connect();

export { client }