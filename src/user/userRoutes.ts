import express from "express";
import { GlobalClass } from "../GlobalClass";
import { compareSync, hash } from 'bcrypt';
import { client } from "../connection";

const usersRoutes = express.Router();
const globalClassInstance = new GlobalClass();
usersRoutes.post('/register', async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const emailVerify = 'SELECT * FROM users WHERE email = $1';
    const emailVerifyResponse = await client.query(emailVerify, [email]);
    if (emailVerifyResponse.rowCount == 1) {
      res.status(500).send('Esse email ja existe');
    } else {
      const hashedPassword = await hash(password, 10);
      const userInsert = 'INSERT INTO users (email, password, username) VALUES ($1, $2, $3)';
      const userInsertResponse = await client.query(userInsert, [email, hashedPassword, username]);
      if (userInsertResponse.rowCount == 1) {
        res.send('Usuário criado com sucesso');
      } else {
        res.status(500).send('Erro ao criar usuário');
      }
    }
  } catch (err) {
    res.status(500).send('Erro ao verificar email');
  }
});
usersRoutes.post('/login', async(req, res) =>{
  try{
    const { email, password } = req.body;
    const accountFinder = 'SELECT * FROM users WHERE email = $1';
    const accountFinderResponse = await client.query(accountFinder, [email]);
    const hashedPassword = accountFinderResponse.rows[0].password;
    const userId = accountFinderResponse.rows[0].id;
    if(accountFinderResponse.rowCount == 1){
      if(compareSync(password, hashedPassword)){
        const tokenCreatorParams = {
          id: userId
        };
        const token = globalClassInstance.tokenCreator(tokenCreatorParams);
        res.send({token});
      }else{
        res.status(500).send("Senha incorreta");
      }
    }else{
      res.status(500).send('Email não encontrado');
    }
  }catch{
    res.status(500).send("Erro ao logar")
  }
})
export { usersRoutes }