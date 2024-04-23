import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import User from "./user";

export const Product = sequelize.define('product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.BIGINT
    },
    stock: {
        type: DataTypes.INTEGER
    },
    image: {
        type: DataTypes.STRING
    },
    userCreated: {
        type: DataTypes.INTEGER,
        references: {
            model: 'shop_users',
            key: 'id'
        }
    },
    codeProduct: {
        type: DataTypes.STRING
    }

})

Product.belongsTo(User, {
    foreignKey: 'userCreated',
    as: 'creator' // Alias cambiado para evitar colisiones
});

User.hasMany(Product, { // Cambio a hasMany si un usuario puede crear múltiples productos
    foreignKey: 'userCreated',
    as: 'createdProducts' // Alias más descriptivo
});