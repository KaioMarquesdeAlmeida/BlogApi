"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalClass = void 0;
const secureKey_1 = __importDefault(require("./secureKey"));
const jsonwebtoken_1 = require("jsonwebtoken");
;
class GlobalClass {
    tokenCreator(tokenCreatorParams) {
        const tokenConfig = {
            expiresIn: '7d'
        };
        const token = (0, jsonwebtoken_1.sign)(tokenCreatorParams, secureKey_1.default, tokenConfig);
        return token;
    }
    tokenResolver(token) {
        try {
            const resolvedToken = (0, jsonwebtoken_1.verify)(token, secureKey_1.default);
            return resolvedToken;
        }
        catch (_a) {
            return false;
        }
    }
}
exports.GlobalClass = GlobalClass;
