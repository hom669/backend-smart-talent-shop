import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import { Order } from "./order";
import { Product } from "./product";

export const OrderDetail = sequelize.define('orderDetail', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idOrder: {
        type: DataTypes.INTEGER,
        references: {
            model: 'orders', // Asegúrate de que el nombre de la tabla es correcto
            key: 'id'
        }
    },
    idProduct: {
        type: DataTypes.INTEGER,
        references: {
            model: 'products', // Asegúrate de que el nombre de la tabla es correcto
            key: 'id'
        }
    },
    quantity: {
        type: DataTypes.INTEGER
    },
    valueUnit: {
        type: DataTypes.INTEGER
    },
    valueTotal: {
        type: DataTypes.INTEGER
    }
});

// Establecer relaciones
Order.hasMany(OrderDetail, {
    foreignKey: 'idOrder',
    as: 'orderDetails'
});
OrderDetail.belongsTo(Order, {
    foreignKey: 'idOrder',
    as: 'order'
});

Product.hasMany(OrderDetail, {
    foreignKey: 'idProduct',
    as: 'orderDetails'
});
OrderDetail.belongsTo(Product, {
    foreignKey: 'idProduct',
    as: 'product'
});