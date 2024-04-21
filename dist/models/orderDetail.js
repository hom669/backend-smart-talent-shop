"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderDetail = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const order_1 = require("./order");
const product_1 = require("./product");
exports.OrderDetail = connection_1.default.define('orderDetail', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idOrder: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'orders', // Asegúrate de que el nombre de la tabla es correcto
            key: 'id'
        }
    },
    idProduct: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'products', // Asegúrate de que el nombre de la tabla es correcto
            key: 'id'
        }
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER
    },
    valueUnit: {
        type: sequelize_1.DataTypes.INTEGER
    },
    valueTotal: {
        type: sequelize_1.DataTypes.INTEGER
    }
});
// Establecer relaciones
order_1.Order.hasMany(exports.OrderDetail, {
    foreignKey: 'idOrder',
    as: 'orderDetails'
});
exports.OrderDetail.belongsTo(order_1.Order, {
    foreignKey: 'idOrder',
    as: 'order'
});
product_1.Product.hasMany(exports.OrderDetail, {
    foreignKey: 'idProduct',
    as: 'orderDetails'
});
exports.OrderDetail.belongsTo(product_1.Product, {
    foreignKey: 'idProduct',
    as: 'product'
});
