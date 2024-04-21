"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const user_1 = __importDefault(require("./user"));
exports.Product = connection_1.default.define('product', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING
    },
    description: {
        type: sequelize_1.DataTypes.STRING
    },
    price: {
        type: sequelize_1.DataTypes.BIGINT
    },
    stock: {
        type: sequelize_1.DataTypes.INTEGER
    },
    image: {
        type: sequelize_1.DataTypes.STRING
    },
    userCreated: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'shop_users',
            key: 'id'
        }
    },
});
exports.Product.belongsTo(user_1.default, {
    foreignKey: 'userCreatedId',
    as: 'creator' // Alias cambiado para evitar colisiones
});
user_1.default.hasMany(exports.Product, {
    foreignKey: 'userCreatedId',
    as: 'createdProducts' // Alias más descriptivo
});
