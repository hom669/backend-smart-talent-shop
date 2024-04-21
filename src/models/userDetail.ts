import { DataTypes, Model } from "sequelize";
import sequelize from "../db/connection";
import User from "./user";

export const UserDetail = sequelize.define('user_detail', {
    // Define los atributos del modelo
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idUser: {
        type: DataTypes.INTEGER,
        references: {
            model: 'shop_users', // Esto debe coincidir con el nombre de la tabla del modelo User
            key: 'id'       // Asumiendo que 'id' es la clave primaria del modelo User
        }
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    identification: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isEmail: true
        }
    }
});

UserDetail.belongsTo(User, {
    foreignKey: 'idUser',
    as: 'user'
});

User.hasOne(UserDetail, {
    foreignKey: 'idUser',
    as: 'details'
});

export default UserDetail;