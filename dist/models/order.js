"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const user_1 = __importDefault(require("./user"));
exports.Order = connection_1.default.define('order', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idUser: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'shop_users', // Asegúrate de que el nombre de la tabla es correcto
            key: 'id'
        }
    },
    totalOrder: {
        type: sequelize_1.DataTypes.INTEGER
    },
    codeOrder: {
        type: sequelize_1.DataTypes.STRING
    }
});
// Establecer la relación entre Order y User
user_1.default.hasMany(exports.Order, {
    foreignKey: 'idUser',
    as: 'orders'
});
exports.Order.belongsTo(user_1.default, {
    foreignKey: 'idUser',
    as: 'user'
});
