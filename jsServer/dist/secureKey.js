"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const secureKey = (0, crypto_1.randomBytes)(32);
exports.default = secureKey;
