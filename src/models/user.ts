import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import Profile from "./profile";

export const User = sequelize.define('shop_user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    idProfile: {
        type: DataTypes.INTEGER,
        references: {
            model: 'profiles', // Esto debe coincidir con el nombre de la tabla del modelo User
            key: 'id'       // Asumiendo que 'id' es la clave primaria del modelo User
        }
    },

});

export default User;