import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import User from "./user";

export const Profile = sequelize.define('profile', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
});

Profile.hasOne(User, {
    foreignKey: 'idProfile',
    as: 'user' // Opcional: define cómo acceder desde Profile a User
});

User.belongsTo(Profile, {
    foreignKey: 'idProfile',
    as: 'profile' // Opcional: define cómo acceder desde User a Profile
});


export default Profile;