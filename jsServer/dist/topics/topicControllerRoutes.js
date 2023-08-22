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
exports.topicControllerRoutes = void 0;
const express_1 = __importDefault(require("express"));
const GlobalClass_1 = require("../GlobalClass");
const connection_1 = require("../connection");
const topicControllerRoutes = express_1.default.Router();
exports.topicControllerRoutes = topicControllerRoutes;
const globalClassInstance = new GlobalClass_1.GlobalClass();
topicControllerRoutes.post('/createTopic', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, token } = req.body;
        const tokenResponse = globalClassInstance.tokenResolver(token);
        if (tokenResponse && typeof tokenResponse !== 'string') {
            const userId = tokenResponse.id;
            const dateWithoutTimezone = new Date();
            let creator, owner, createdIn, bannedUsers;
            const topicParams = [
                title,
                description,
                creator = userId,
                owner = userId,
                createdIn = dateWithoutTimezone,
                bannedUsers = []
            ];
            const topicInsert = 'INSERT  INTO topics (title, description, creator, owner, "createdIn", "bannedUsers") VALUES ($1, $2, $3, $4, $5, $6)';
            const topicInsertResponse = yield connection_1.client.query(topicInsert, topicParams);
            if (topicInsertResponse.rowCount != 0) {
                res.send('Sucesso ao criar tópico');
            }
            else {
                res.status(500).send("Erro ao criar tópico");
            }
        }
        else {
            res.status(500).send("Token inválido");
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Erro ao criar tópico");
    }
}));
topicControllerRoutes.post('/deleteTopic', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token, topicId } = req.body;
        const tokenResponse = globalClassInstance.tokenResolver(token);
        if (tokenResponse && typeof tokenResponse !== 'string') {
            const topicOwnerVerify = 'SELECT owner FROM users WHERE id = $1';
            const topicOwnerVerifyResponse = yield connection_1.client.query(topicOwnerVerify, [topicId]);
            if (topicOwnerVerifyResponse.rowCount == 1) {
                if (topicOwnerVerifyResponse.rows[0].owner == tokenResponse._id) {
                    const topicDelete = 'DELETE FROM topics WHERE owner = $1;';
                    const topicDeleteResponse = yield connection_1.client.query(topicDelete, [topicId]);
                }
                else {
                    res.status(500).send("Esse tópico não pertence a você");
                }
            }
            else {
                res.status(500).send("Erro ao encontrar topic");
            }
        }
        else {
            res.status(500).send("Token inválido");
        }
    }
    catch (_a) {
    }
}));
