import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
import { usersRoutes } from './user/userRoutes';
import { topicControllerRoutes } from './topics/topicControllerRoutes';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(usersRoutes, topicControllerRoutes)

app.get('/teste', (req, res) => {
  res.send("deu bom")
});

app.listen(4000);