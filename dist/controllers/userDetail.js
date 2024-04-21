"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDetail = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const user_1 = require("../models/user");
exports.UserDetail = connection_1.default.define('user_detail', {
    // Define los atributos del modelo
    idUser: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'shop_user', // Esto debe coincidir con el nombre de la tabla del modelo User
            key: 'id' // Asumiendo que 'id' es la clave primaria del modelo User
        }
    },
    fullName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    identification: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    }
});
exports.UserDetail.belongsTo(user_1.User, {
    foreignKey: 'idUser',
    as: 'user' // Esto te permite acceder al usuario a través de userDetails.user
});
