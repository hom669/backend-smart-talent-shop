"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const user_1 = __importDefault(require("./user"));
exports.Profile = connection_1.default.define('profile', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false
    },
});
exports.Profile.hasOne(user_1.default, {
    foreignKey: 'idProfile',
    as: 'user' // Opcional: define cómo acceder desde Profile a User
});
user_1.default.belongsTo(exports.Profile, {
    foreignKey: 'idProfile',
    as: 'profile' // Opcional: define cómo acceder desde User a Profile
});
exports.default = exports.Profile;
