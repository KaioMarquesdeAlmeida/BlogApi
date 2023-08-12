"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const pg_1 = require("pg");
const connectionString = 'postgres://postgres:123@localhost:5432/teste';
const client = new pg_1.Client(connectionString);
exports.client = client;
client.connect();
