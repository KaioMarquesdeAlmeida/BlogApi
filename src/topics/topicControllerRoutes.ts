import express from 'express';
import { GlobalClass } from '../GlobalClass';
import { compareSync, hash } from 'bcrypt';
import { client } from '../connection';


const  topicControllerRoutes = express.Router();
const globalClassInstance = new GlobalClass();

topicControllerRoutes.post('/createTopic', async (req, res) =>{
  try{
    const { title, description, token } = req.body;
    const tokenResponse = globalClassInstance.tokenResolver(token);
    if(tokenResponse && typeof tokenResponse !== 'string'){
      const userId = tokenResponse.id;
      const dateWithoutTimezone = new Date();

      let creator, owner, createdIn, bannedUsers;
      const topicParams = [
        title,
        description,
        creator =  userId,
        owner = userId,
        createdIn = dateWithoutTimezone,
        bannedUsers = []
      ];
      const topicInsert = 'INSERT  INTO topics (title, description, creator, owner, "createdIn", "bannedUsers") VALUES ($1, $2, $3, $4, $5, $6)';
      const topicInsertResponse = await client.query(topicInsert, topicParams);
      if(topicInsertResponse.rowCount != 0){
        res.send('Sucesso ao criar tópico')
      }else{
        res.status(500).send("Erro ao criar tópico")
      }
    }else{
      res.status(500).send("Token inválido")
    }
  }catch (error){
    console.log(error)
    res.status(500).send("Erro ao criar tópico")
  }
})
topicControllerRoutes.post('/deleteTopic', async (req, res) => {
   try{
    const { token, topicId } = req.body
    const tokenResponse = globalClassInstance.tokenResolver(token);
    if(tokenResponse && typeof tokenResponse !== 'string'){
      const topicOwnerVerify = 'SELECT owner FROM users WHERE id = $1'
      const topicOwnerVerifyResponse = await client.query(topicOwnerVerify, [topicId]);
      if(topicOwnerVerifyResponse.rowCount == 1){
        if(topicOwnerVerifyResponse.rows[0].owner == tokenResponse._id){
          const topicDelete = 'DELETE FROM topics WHERE owner = $1;'
          const topicDeleteResponse = await client.query(topicDelete, [topicId]);
        }else{  
          res.status(500).send("Esse tópico não pertence a você")
        }
      }else{
        res.status(500).send("Erro ao encontrar topic")
      }
    }else{
      res.status(500).send("Token inválido")
    }
  }catch{

   }
});

export { topicControllerRoutes }