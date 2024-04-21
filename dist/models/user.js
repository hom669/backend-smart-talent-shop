"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.User = connection_1.default.define('shop_user', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    idProfile: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'profiles', // Esto debe coincidir con el nombre de la tabla del modelo User
            key: 'id' // Asumiendo que 'id' es la clave primaria del modelo User
        }
    },
});
exports.default = exports.User;
