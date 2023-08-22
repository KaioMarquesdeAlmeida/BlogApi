import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
import { usersRoutes } from './user/userRoutes';
import { topicControllerRoutes } from './topics/topicControllerRoutes';
import dotenv from 'dotenv';
dotenv.config();


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(usersRoutes, topicControllerRoutes)

app.get('/teste', (req, res) => {
  res.send("deu bom")
});

app.listen({
  host: '0.0.0.0',
  port: process.env.PORT ? Number(process.env.PORT) : 3333,

}, () =>{
  console.log("Rodando");
});