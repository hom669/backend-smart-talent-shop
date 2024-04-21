import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import User from "./user";

export const Order = sequelize.define('order', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idUser: {
        type: DataTypes.INTEGER,
        references: {
            model: 'shop_users', // Asegúrate de que el nombre de la tabla es correcto
            key: 'id'
        }
    },
    totalOrder: {
        type: DataTypes.INTEGER
    }
});

// Establecer la relación entre Order y User
User.hasMany(Order, {
    foreignKey: 'idUser',
    as: 'orders'
});
Order.belongsTo(User, {
    foreignKey: 'idUser',
    as: 'user'
});