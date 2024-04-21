"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sequelize = new sequelize_1.Sequelize(process.env.NAME_DB || '', process.env.USER_DB || '', process.env.PASS_DB || '', {
    host: process.env.HOST_DB || '',
    dialect: 'mysql'
});
exports.default = sequelize;
