"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRoutes = void 0;
const express_1 = __importDefault(require("express"));
const GlobalClass_1 = require("../GlobalClass");
const bcrypt_1 = require("bcrypt");
const connection_1 = require("../connection");
const usersRoutes = express_1.default.Router();
exports.usersRoutes = usersRoutes;
const globalClassInstance = new GlobalClass_1.GlobalClass();
usersRoutes.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, username } = req.body;
        const emailVerify = 'SELECT * FROM users WHERE email = $1';
        const emailVerifyResponse = yield connection_1.client.query(emailVerify, [email]);
        if (emailVerifyResponse.rowCount == 1) {
            res.status(500).send('Esse email ja existe');
        }
        else {
            const hashedPassword = yield (0, bcrypt_1.hash)(password, 10);
            const userInsert = 'INSERT INTO users (email, password, username) VALUES ($1, $2, $3)';
            const userInsertResponse = yield connection_1.client.query(userInsert, [email, hashedPassword, username]);
            if (userInsertResponse.rowCount == 1) {
                res.send('Usuário criado com sucesso');
            }
            else {
                res.status(500).send('Erro ao criar usuário');
            }
        }
    }
    catch (err) {
        res.status(500).send('Erro ao verificar email');
    }
}));
usersRoutes.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const accountFinder = 'SELECT * FROM users WHERE email = $1';
        const accountFinderResponse = yield connection_1.client.query(accountFinder, [email]);
        const hashedPassword = accountFinderResponse.rows[0].password;
        const userId = accountFinderResponse.rows[0].id;
        if (accountFinderResponse.rowCount == 1) {
            if ((0, bcrypt_1.compareSync)(password, hashedPassword)) {
                const tokenCreatorParams = {
                    id: userId
                };
                const token = globalClassInstance.tokenCreator(tokenCreatorParams);
                res.send({ token });
            }
            else {
                res.status(500).send("Senha incorreta");
            }
        }
        else {
            res.status(500).send('Email não encontrado');
        }
    }
    catch (_a) {
        res.status(500).send("Erro ao logar");
    }
}));
