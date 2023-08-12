"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = require("./user/userRoutes");
const topicControllerRoutes_1 = require("./topics/topicControllerRoutes");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(userRoutes_1.usersRoutes, topicControllerRoutes_1.topicControllerRoutes);
app.get('/teste', (req, res) => {
    res.send("deu bom");
});
app.listen(4000);
