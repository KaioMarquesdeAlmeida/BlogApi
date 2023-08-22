import { Client } from 'pg';
const connectionString = 'postgres://kaio:VKaGtjGJL4FR2Gv55OhGd0DKYvxEEC0O@dpg-cjihps8cfp5c7388vqvg-a.ohio-postgres.render.com/kaiolindo';
const client = new Client(connectionString);
client.connect();

export { client }